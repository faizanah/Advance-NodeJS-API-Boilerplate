import * as dotenv from 'dotenv';
import ENV from './environments/';
// import db from '../utilities/db'
dotenv.config()
export class AppSetting {
    static get NODE_ENV() {
        return process.env.NODE_ENV || 'development';
    }
    static getConfig() {
        let env = ENV[this.NODE_ENV];
        console.log(JSON.stringify(env, null, 2))
        return env
    }
    static getDBConnection() {
        return db;
    }
}
export default AppSetting;