import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleSSOGuard } from './guards/google-sso.guard';
import * as E from 'fp-ts/Either';
import { throwHTTPErr } from 'src/utils';
import { authCookieHandler } from './helper';
import { GithubSSOGuard } from './guards/github-sso.guard';
import { RTJwtAuthGuard } from './guards/rt-jwt-auth.guard';
import { AuthUser } from 'src/types/AuthUser';
import { User } from 'src/decorators/user.decorator';
import { RTCookie } from 'src/decorators/rt-cookie.decorator';
import { Response } from 'express';
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleSSOGuard)
  async googleAuth(@Request() req) {}

  @Get('google/callback')
  @UseGuards(GoogleSSOGuard)
  async googleAuthRedirect(@Request() req, @Res() res) {
    const authTokens = await this.authService.generateAuthTokens(req.user.uid);
    if (E.isLeft(authTokens)) throwHTTPErr(authTokens.left);
    authCookieHandler(res, authTokens.right, true);
  }

  @Get('github')
  @UseGuards(GithubSSOGuard)
  async githubAuth(@Request() req) {}

  @Get('github/callback')
  @UseGuards(GithubSSOGuard)
  async githubAuthRedirect(@Request() req, @Res() res) {
    const authTokens = await this.authService.generateAuthTokens(req.user.uid);
    if (E.isLeft(authTokens)) throwHTTPErr(authTokens.left);
    authCookieHandler(res, authTokens.right, true);
  }

  @Get('refresh')
  @UseGuards(RTJwtAuthGuard)
  async refresh(
    @User() user: AuthUser,
    @RTCookie() refresh_token: string,
    @Res() res,
  ) {
    const newTokenPair = await this.authService.refreshAuthTokens(
      refresh_token,
      user,
    );
    if (E.isLeft(newTokenPair)) throwHTTPErr(newTokenPair.left);
    authCookieHandler(res, newTokenPair.right, false);
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.status(200).send();
  }
}
