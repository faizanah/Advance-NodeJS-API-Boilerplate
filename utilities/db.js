import knex from 'knex';
import { AppSetting } from '../config';
const CONFIG = AppSetting.getConfig();
const db = knex({
  client: 'oracle',
  connection: CONFIG.DB.ENV_CDT_CONNECTION,
  migrations: {
    tableName: 'migrations',
  },
  debug: CONFIG.DB.ENV_CDT_DATABASE_DEBUG,
});
export default db;
