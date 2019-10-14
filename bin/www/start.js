import server from './server';
import {AppSetting} from '../../config'

// // import { sequelize } from './helpers/sequelize/sequelize.config';
server.run();
console.log(`Server is listening on ${AppSetting.getConfig().APP.ENV_CDT_PORT}`);

// // sequelize.setConnection();
let app = server.app;
export { app };