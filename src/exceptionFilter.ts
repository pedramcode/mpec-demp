/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ValidationError } from 'class-validator';

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Default response
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    // Handle NestJS HttpException (thrown manually in services/controllers)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as object);
    }

    // Handle TypeORM query errors
    else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      const driverError = (exception as any).driverError;

      // PostgreSQL error codes: https://www.postgresql.org/docs/current/errcodes-appendix.html
      switch (driverError.code) {
        case '23505': // unique_violation
          message = 'Duplicate value violates unique constraint';
          break;
        case '23503': // foreign_key_violation
          message = 'Foreign key constraint violation';
          break;
        case '23502': // not_null_violation
          message = 'Missing required field (null violation)';
          break;
        default:
          message = driverError.detail || exception.message;
      }
    }

    // Handle validation errors (from class-validator via ValidationPipe)
    else if (
      Array.isArray(exception) &&
      exception.every((err) => err instanceof ValidationError)
    ) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.map((err) => {
        return {
          property: err.property,
          errors: Object.values(err.constraints ?? {}),
        };
      });
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
