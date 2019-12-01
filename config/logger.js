import winston from 'winston';
import fs from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

export default class Logger {
  constructor() {
    this.log = undefined;
  }

  static get logDirectory() {
    return path.join(process.cwd(), 'logs');
  }

  static createLogFolderIfNotExists() {
    // ensure log directory exists
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory);
    }
  }

  static setLogger() {
    if (!this.log) {
      this.log = winston.createLogger({
        transports: [
          new DailyRotateFile({
            filename: path.join(Logger.logDirectory, '%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            prepend: true,
            localTime: true,
            level: 'verbose'
          })
        ],
        exitOnError: false
      });
    }
  }

  static configureLogger() {
    this.createLogFolderIfNotExists();
    this.setLogger();
  }

  static getValue(value) {
    if (typeof value === 'string') {
      return value;
    }
    return JSON.stringify(value);
  }

  static debug(value) {
    if (this.log) {
      this.log.log('debug', this.getValue(value));
    } else {
      // console.log(this.GetValue(value));
    }
  }

  static error(value) {
    if (this.log) {
      this.log.log('error', this.getValue(value));
    } else {
      // console.log(this.GetValue(value));
    }
  }

  static warn(value) {
    if (this.log) {
      this.log.log('warn', this.getValue(value));
    } else {
      // console.log(this.GetValue(value));
    }
  }

  static info(value) {
    if (this.log) {
      this.log.log('info', this.getValue(value));
    } else {
      // console.log(this.getValue(value));
    }
  }
}
