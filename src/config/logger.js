const winston = require('winston');
const DateUtil = require('../utils/date');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const APP_ENV = process.env.APP_ENV;
const logger = winston.createLogger({
  level: APP_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    APP_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: <${DateUtil.getTime()}> ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    new winston.transports.File({
      filename: `logs/${DateUtil.getDate()}_error.log`
    })
  ],
});

module.exports = logger;