import knex from 'knex';
import { AppSetting, Logger } from '..';

const CONFIG = AppSetting.getConfig();
const db = knex({
  client: CONFIG.DB.DIALECT,
  connection: AppSetting.getDBConnection(),
  debug: CONFIG.DB.ENV_CDT_DATABASE_DEBUG,
  pool: {
    min: 0,
    max: 7
  }
});
db.raw('select 1+1 as result')
  .then(() =>
    Logger.debug(`Successful connected with ${CONFIG.DB.DIALECT} database.`)
  )
  .catch(err => {
    Logger.error(err);
    process.exit(1);
    throw err;
  });
export default db;
