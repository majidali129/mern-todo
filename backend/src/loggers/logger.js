import { transports, format, createLogger, addColors } from 'winston';
const { combine, colorize, timestamp, json } = format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  info: 'blue',
  warn: 'yellow',
  http: 'magenta',
  debug: 'white',
};

addColors(colors);

const consoleLogFormat = format.combine(
  timestamp({ format: 'DD MMM, YYYY - HH:mm:ss:ms' }),
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message}: ${timestamp}`;
  })
);

export const logger = createLogger({
  level: level(),
  levels,
  format: combine(colorize(), json(), timestamp()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
  ],
});
