import knex from 'knex';
import { AppSetting } from '../app.setting';
const CONFIG = AppSetting.getConfig();
console.log(CONFIG);
const db = knex({
	client: CONFIG.DB.DIALECT,
	connection: CONFIG.DB[CONFIG.DB.DIALECT],
	debug: CONFIG.DB.ENV_CDT_DATABASE_DEBUG,
	pool: {
		min: 0,
		max: 7
	}
});
db.raw('select 1+1 as result').then((users) => 
	console.log(`Successful connected with ${CONFIG.DB.DIALECT} database.`)
).catch((err) => { 
	console.log(err); 
	process.exit(1);
	throw err; 
})
.finally(() => {
	//db.destroy();
});
export default db;