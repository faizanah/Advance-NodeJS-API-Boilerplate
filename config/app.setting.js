import CDT_ENV from './environments/';
import CONFIG from './environments/';

export class AppSetting {
    static get NODE_ENV() {
        return process.env.NODE_ENV || 'development';
    }
    static getConfig() {
        let env = CDT_ENV[this.NODE_ENV];
        return env;
    }
    static isProduction(){
		return process.env.NODE_ENV === 'production';
    }
    
    static getDBConnection() {
        const CONFIG = this.getConfig();
        switch (CONFIG.DB.DIALECT) {
            case 'mssql':
                return this.getMsSql();
                break;
            case 'oracledb':
                return this.getOracle();
                break;
            default:
                throw new Error('No DB connection found');
            }

    }

    static getMsSql() {
        const CONFIG = this.getConfig();
        return {
			host: CONFIG.DB.HOST,
			options: {
				database: CONFIG.DB.DATABASE_NAME,
				encrypt: true,
				port: CONFIG.DB.PORT
			},
			password: CONFIG.DB.PASSWORD,
			user: CONFIG.DB.USERNAME
		}
    }

    static getOracle() {
        const CONFIG = this.getConfig();
        return {
			host: CONFIG.DB.HOST,
			port: CONFIG.DB.PORT,
			user: CONFIG.DB.USERNAME,
			password: CONFIG.DB.PASSWORD,
			database: CONFIG.DB.DATABASE_NAME
		}
    }
}
export default AppSetting;