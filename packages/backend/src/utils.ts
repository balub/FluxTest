import { HttpException } from '@nestjs/common';
import { RESTError } from './types/RESTError';

export function throwHTTPErr(errorData: RESTError): never {
  const { message, statusCode } = errorData;
  throw new HttpException(message, statusCode);
}
