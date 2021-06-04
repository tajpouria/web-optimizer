const { createLogger, format, transports } = require("winston");

const { envVar } = require("./env-var");

const { NODE_ENV } = envVar;

const logger = createLogger({
  level: NODE_ENV,
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    }),
  ],
});

module.exports = { logger };
