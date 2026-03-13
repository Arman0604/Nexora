import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger.js';
import { AppError } from '../types/index.js';

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = 'statusCode' in err ? err.statusCode : 500;
  const isOperational = 'isOperational' in err ? err.isOperational : false;

  if (statusCode >= 500) {
    logger.error({ err, statusCode }, 'Internal server error');
  } else {
    logger.warn({ err, statusCode }, 'Client error');
  }

  const response: Record<string, unknown> = {
    status: 'error',
    message: isOperational ? err.message : 'Internal Server Error',
  };

  if (process.env['NODE_ENV'] !== 'production') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}
