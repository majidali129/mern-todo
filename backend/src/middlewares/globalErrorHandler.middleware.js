import mongoose from 'mongoose';
import { apiError } from '../utils/apiError.js';
import { logger } from '../loggers/logger.js';

export const globalErrorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof apiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;
    const message = error.message || 'something went wrong';

    error = new apiError(statusCode, message);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
  };

  logger.error(`${error.message}`);

  return res.status(error.statusCode).json(response);
};
