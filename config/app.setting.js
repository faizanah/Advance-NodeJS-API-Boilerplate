import * as dotenv from 'dotenv';
import ENV from './environments/';
dotenv.config()
export class AppSetting {
    static get NODE_ENV() {
        return process.env.NODE_ENV || 'development';
    }
    static getConfig() {
        let env = ENV[this.NODE_ENV];
        return env;
    }
    // static getDBConnection() {
    //     return db;
    // }
}
export default AppSetting;