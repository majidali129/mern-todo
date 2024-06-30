import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import { logger } from './loggers/logger.js';
import todoRouter from '../src/routes/todo.routes.js';
import userRouter from '../src/routes/auth.routes.js';
import { globalErrorHandler } from '../src/middlewares/globalErrorHandler.middleware.js';

export const app = express();

const morganFormat = ':method :url :status :response-time ms';

// COMMON MIDDLEWARES
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', todoRouter);

app.use(globalErrorHandler);
