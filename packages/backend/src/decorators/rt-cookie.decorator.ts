import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RTCookie = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.cookies['refresh_token'];
  },
);
