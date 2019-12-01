import express from 'express';
import { json, urlencoded } from 'body-parser';
import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import HeaderMiddleware from '../../lib/middleware/header.middleware';
import Api from '../../lib/api';
import { Logger, AppSetting, ApiDoc, AppError } from '../../config';
import ApiRouting from '../../config/api.routing';

class Server {
  constructor() {
    this.app = express();
    this.router = express.Router();
    this.configure();
  }

  configure() {
    this.configureMiddleware();
    this.configureRoutes();
    this.errorHandler();
  }

  configureMiddleware() {
    this.app.use(json({ limit: '50mb' }));
    this.app.use(compression());
    this.app.use(urlencoded({ limit: '50mb', extended: true }));
    this.app.use(express.static('public'));
    this.CONFIG = AppSetting.getConfig();
    this.enableHelmet();
    ApiDoc.publish(this.app);
    this.app.set('PORT', this.CONFIG.APP.PORT);
    Logger.configureLogger(this.app);
    this.app.use(HeaderMiddleware.AUTHORIZE());
  }

  enableHelmet() {
    this.app.use(helmet());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.hsts({ maxAge: 7776000000 }));
    this.app.use(helmet.frameguard('SAMEORIGIN'));
    this.app.use(helmet.xssFilter({ setOnOldIE: true }));
    this.app.use(helmet.noSniff());
  }

  async configureRoutes() {
    this.app.use((req, res, next) => {
      Array.from(req.query).forEach(key => {
        if (key) {
          req.query[key.toLowerCase()] = req.query[key];
        }
      });
      next();
    });
    await ApiRouting.ConfigureRouters(this.app);
  }

  errorHandler() {
    this.app.use((err, req, res, next) => {
      if (req.body) {
        Logger.error(req.body);
      }
      Logger.error(err);
      Api.serverError(req, res, err);
      next();
    });

    // // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      Api.notFound(req, res, new AppError('ERR_INVALID_PATH'));
      next();
    });
  }

  run() {
    this.CONFIG = AppSetting.getConfig();
    const server = http.createServer(this.app);
    server.on('error', Server.onError);
    server.listen(this.CONFIG.APP.PORT, () => {
      Logger.debug(
        `${this.CONFIG.APP.NAME} - is listening on ${server.address().port}`
      );
    });
  }

  static onError(error) {
    const port = AppSetting.getConfig().APP.PORT;
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        Logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        Logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}
export default new Server();
