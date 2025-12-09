import type { NextFunction, Request, Response } from 'express';

export type ApiError = {
  status?: number;
  message: string;
  details?: Record<string, unknown>;
};

export const notFoundHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  void _next;
  res.status(404).json({
    error: 'not_found',
    message: 'Route not found',
  });
};

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  void _next;
  const statusCode = err.status ?? 500;
  res.status(statusCode).json({
    error: 'api_error',
    message: err.message ?? 'Unexpected error',
    details: err.details ?? undefined,
  });
};
