import express from 'express';
import { json, urlencoded } from 'body-parser';
import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import { HeaderMiddleware } from '../../lib/middleware';
import ApiRouting from '../../config/api.routing';
import Api from '../../lib/api';
import { Logger, AppSetting } from '../../config';
class Server {

	constructor() {
		this.app = express();
		this.router = express.Router();
		this.config = AppSetting.getConfig(); 
		this.configure();
	}

	configure() {
		this.configureMiddleware();
		this.configureBaseRoute();
		this.configureRoutes();
		this.errorHandler();
	}

	configureMiddleware() {
		this.app.use(json({ limit: '50mb' }));
		this.app.use(compression());
		this.app.use(urlencoded({ limit: '50mb', extended: true }));
		this.enableHelmet();
		Logger.configureLogger(this.app);
		this.app.use(HeaderMiddleware.AUTHORIZE());
	}
	enableHelmet(){
		this.app.use(helmet());
		this.app.use(helmet.hidePoweredBy());
		this.app.use(helmet.hsts({ maxAge: 7776000000 }));
		this.app.use(helmet.frameguard( 'SAMEORIGIN' ));
		this.app.use(helmet.xssFilter({ setOnOldIE: true }));
		this.app.use(helmet.noSniff());
	}

	configureBaseRoute() {
		// this.app.use(function (req, res, next) {
		//     if (req.url === '/') {
		// //         return res.json(config.appConfig);
		//     } else {
		//         next();
		//     }
		// });
		// this.app.use('/', this.router);
	}

	configureRoutes() {
		this.app.use(function (req, res, next) {
			for (let key in req.query) {
				if (key) {
					req.query[key.toLowerCase()] = req.query[key];
				}
			}
			next();
		});
		ApiRouting.ConfigureRouters(this.app);
	}

	errorHandler() {
		this.app.use(function (err, req, res, next) {
			if (req.body) {
				Logger.error(req.body);
			}
			Logger.error(err);
			Api.serverError(req, res, err);
		});

		// // catch 404 and forward to error handler
		this.app.use( (req, res, next) => {
			Api.notFound(req, res, { code: '9004', message: 'Invalid resource path' });
		});
	}


	run() {
		let server = http.createServer(this.app);
		server.listen(this.config.APP.ENV_CDT_PORT || 3000);
		server.on('error', this.onError);
	}

	onError(error) {
		let port = this.config.APP.ENV_CDT_PORT;
		if (error.syscall !== 'listen') {
			throw error;
		}

		const bind = typeof port === 'string'
			? 'Pipe ' + port
			: 'Port ' + port;

		// handle specific listen errors with friendly messages
		switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
		}
	}
}
export default new Server();