import winston from 'winston';

const logFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, timestamp, message }) => `[${timestamp}] [${level}] ${message}`),
);

const consoleTransport = new winston.transports.Console({ format: logFormat });

const logger = winston.createLogger({ transports: [consoleTransport] });

export default logger;
