import winston from 'winston';
import fs from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import AppSetting from './app.setting';

class Logger {
  constructor() {
    this.logger = undefined;
  }

  static get logDirectory() {
    return path.join(process.cwd(), 'logs');
  }

  static CreateLogFolderIfNotExists() {
    // ensure log directory exists
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory);
    }
  }

  static logFormat() {
    return winston.format.combine(
      winston.format.label({ label: AppSetting.getConfig().APP.NAME }),
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(
        msg =>
          `${msg.timestamp} ${[msg.label]} - ${[msg.level]}: ${msg.message}`
      )
    );
  }

  static setLogger() {
    if (!this.logger) {
      this.logger = winston.createLogger({
        // format: this.logFormat(),
        transports: [
          new winston.transports.Console({ level: 'debug' }),
          new DailyRotateFile({
            filename: path.join(Logger.logDirectory, '%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            prepend: true,
            localTime: true,
            level: 'verbose',
            handleExceptions: true,
            json: false,
            colorize: true,
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
          })
        ],
        exitOnError: false
      });
    }
  }

  static configureLogger() {
    this.CreateLogFolderIfNotExists();
    this.setLogger();
  }

  static GetValue(value) {
    if (typeof value === 'string') {
      return value;
    }
    return JSON.stringify(value);
  }

  static debug(value) {
    if (this.logger) {
      this.logger.log('debug', this.GetValue(value));
    } else {
      //   console.log(this.GetValue(value));
    }
  }

  static error(value) {
    if (this.logger) {
      this.logger.log('error', this.GetValue(value));
    } else {
      //   console.log(this.GetValue(value));
    }
  }

  static warn(value) {
    if (this.logger) {
      this.logger.log('warn', this.GetValue(value));
    } else {
      //   console.log(this.GetValue(value));
    }
  }

  static info(value) {
    if (this.logger) {
      this.logger.log('info', this.GetValue(value));
    } else {
      //   console.log(this.GetValue(value));
    }
  }
}
export default Logger;
