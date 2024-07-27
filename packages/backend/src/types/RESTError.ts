import { HttpStatus } from '@nestjs/common';

export type RESTError = {
  message: string | Record<string, string>;
  statusCode: HttpStatus;
};
