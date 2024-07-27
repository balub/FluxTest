import { AuthTokens, AuthTokenType } from 'src/types/AuthTokens';
import { DateTime } from 'luxon';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

export const authCookieHandler = (
  res: Response,
  authTokens: AuthTokens,
  redirect: boolean,
) => {
  const currentTime = DateTime.now();
  const accessTokenValidity = currentTime
    .plus({
      milliseconds: parseInt(process.env.ACCESS_TOKEN_VALIDITY),
    })
    .toMillis();
  const refreshTokenValidity = currentTime
    .plus({
      milliseconds: parseInt(process.env.REFRESH_TOKEN_VALIDITY),
    })
    .toMillis();

  res.cookie(AuthTokenType.ACCESS_TOKEN, authTokens.access_token, {
    httpOnly: true,
    secure: process.env.ALLOW_SECURE_COOKIES === 'true',
    sameSite: 'lax',
    maxAge: accessTokenValidity,
  });
  res.cookie(AuthTokenType.REFRESH_TOKEN, authTokens.refresh_token, {
    httpOnly: true,
    secure: process.env.ALLOW_SECURE_COOKIES === 'true',
    sameSite: 'lax',
    maxAge: refreshTokenValidity,
  });

  if (!redirect) {
    return res.status(HttpStatus.OK).send();
  }

  return res.status(HttpStatus.OK).redirect(process.env.REDIRECT_URL);
};
