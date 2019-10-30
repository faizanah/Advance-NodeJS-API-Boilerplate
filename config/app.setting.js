import CDT_ENV from './environments/';

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
}
export default AppSetting;