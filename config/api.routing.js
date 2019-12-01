import express from 'express';
import fs from 'fs';
import AppSetting from './app.setting';
import AppError from './app.error';
import Logger from './logger';

const router = express.Router();
class ApiRouting {
  static async ConfigureRouters(app) {
    const versions = this.getVersions();
    versions.map(async version => {
      const routes = this.getRoutesByVersion(version);
      routes.map(async route => {
        this.loadRoute(version, route);
      });
    });
    app.use(AppSetting.getConfig().APP.BASE_PATH || '', router);
  }

  static getFile(path) {
    return fs.readdirSync(path).filter(dir => !dir.match(/(^\.)|index/i));
  }

  static getVersions() {
    return this.getFile(`${__dirname}/../app/`);
  }

  static getRoutesByVersion(version) {
    return this.getFile(`${__dirname}/../app/${version}/routes`);
  }

  static loadRoute(version, route) {
    import(`${__dirname}/../app/${version}/routes/${route}`)
      .then(m => {
        return m.default(router);
      })
      .catch(error => {
        Logger.error(error);
        throw new AppError('ERR_LOAD_ROUTE');
      });
  }
}
export default ApiRouting;
