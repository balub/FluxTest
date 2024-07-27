import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUser } from 'src/types/AuthUser';
import { UserService } from 'src/user/user.service';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import {
  AccessTokenPayload,
  AuthTokens,
  RefreshTokenPayload,
} from 'src/types/AuthTokens';
import * as argon2 from 'argon2';
import { RESTError } from 'src/types/RESTError';
import { INVALID_REFRESH_TOKEN, USER_NOT_FOUND } from 'src/errors';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async generateAuthTokens(userUid: string) {
    const accessTokenPayload: AccessTokenPayload = {
      iss: process.env.VITE_BASE_URL,
      sub: userUid,
      aud: [process.env.VITE_BASE_URL],
    };

    const refreshToken = await this.generateRefreshToken(userUid);
    if (E.isLeft(refreshToken)) return E.left(refreshToken.left);

    return E.right(<AuthTokens>{
      access_token: await this.jwtService.sign(accessTokenPayload, {
        expiresIn: process.env.ACCESS_TOKEN_VALIDITY, //1 Day
      }),
      refresh_token: refreshToken.right,
    });
  }

  private async generateRefreshToken(userUid: string) {
    const refreshTokenPayload: RefreshTokenPayload = {
      iss: process.env.VITE_BASE_URL,
      sub: userUid,
      aud: [process.env.VITE_BASE_URL],
    };

    const refreshToken = await this.jwtService.sign(refreshTokenPayload, {
      expiresIn: process.env.REFRESH_TOKEN_VALIDITY, //7 Days
    });

    const refreshTokenHash = await argon2.hash(refreshToken);

    const updatedUser = await this.usersService.updateUserRefreshToken(
      refreshTokenHash,
      userUid,
    );
    if (E.isLeft(updatedUser))
      return E.left(<RESTError>{
        message: updatedUser.left,
        statusCode: HttpStatus.NOT_FOUND,
      });

    return E.right(refreshToken);
  }

  async checkIfProviderAccountExists(user: AuthUser, SSOUserData) {
    const provider = await this.prismaService.account.findUnique({
      where: {
        verifyProviderAccount: {
          provider: SSOUserData.provider,
          providerAccountId: SSOUserData.id,
        },
      },
    });

    if (!provider) return O.none;

    return O.some(provider);
  }

  async refreshAuthTokens(hashedRefreshToken: string, user: AuthUser) {
    // Check to see user is valid
    if (!user)
      return E.left({
        message: USER_NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      });

    // Check to see if the hashed refresh_token received from the client is the same as the refresh_token saved in the DB
    const isTokenMatched = await argon2.verify(
      user.refreshToken,
      hashedRefreshToken,
    );
    if (!isTokenMatched)
      return E.left({
        message: INVALID_REFRESH_TOKEN,
        statusCode: HttpStatus.NOT_FOUND,
      });

    // if tokens match, generate new pair of auth tokens
    const generatedAuthTokens = await this.generateAuthTokens(user.uid);
    if (E.isLeft(generatedAuthTokens))
      return E.left({
        message: generatedAuthTokens.left.message,
        statusCode: generatedAuthTokens.left.statusCode,
      });

    return E.right(generatedAuthTokens.right);
  }
}
