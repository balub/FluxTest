import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { AuthUser } from 'src/types/AuthUser';
import { USER_NOT_FOUND } from 'src/errors';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });
    if (!user) return O.none;
    return O.some(user);
  }

  async createUserSSO(
    accessTokenSSO: string,
    refreshTokenSSO: string,
    profile,
  ) {
    const userDisplayName = !profile.displayName ? null : profile.displayName;
    const userPhotoURL = !profile.photos ? null : profile.photos[0].value;

    const createdUser = await this.prisma.user.create({
      data: {
        displayName: userDisplayName,
        email: profile.emails[0].value,
        photoURL: userPhotoURL,
        providerAccounts: {
          create: {
            provider: profile.provider,
            providerAccountId: profile.id,
            providerRefreshToken: refreshTokenSSO,
            providerAccessToken: accessTokenSSO,
          },
        },
      },
    });

    return createdUser;
  }

  async updateUserDetails(user: AuthUser, profile) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          uid: user.uid,
        },
        data: {
          displayName: !profile.displayName ? null : profile.displayName,
          photoURL: !profile.photos ? null : profile.photos[0].value,
        },
      });
      return E.right(updatedUser);
    } catch (error) {
      return E.left(USER_NOT_FOUND);
    }
  }

  async createProviderAccount(
    user: AuthUser,
    accessToken: string,
    refreshToken: string,
    profile,
  ) {
    const createdProvider = await this.prisma.account.create({
      data: {
        provider: profile.provider,
        providerAccountId: profile.id,
        providerRefreshToken: refreshToken ? refreshToken : null,
        providerAccessToken: accessToken ? accessToken : null,
        user: {
          connect: {
            uid: user.uid,
          },
        },
      },
    });

    return createdProvider;
  }

  async updateUserRefreshToken(refreshTokenHash: string, userUid: string) {
    try {
      const user = await this.prisma.user.update({
        where: {
          uid: userUid,
        },
        data: {
          refreshToken: refreshTokenHash,
        },
      });

      return E.right(user);
    } catch (error) {
      return E.left(USER_NOT_FOUND);
    }
  }

  async findUserById(userUid: string): Promise<O.None | O.Some<AuthUser>> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          uid: userUid,
        },
      });
      return O.some(user);
    } catch (error) {
      return O.none;
    }
  }
}
