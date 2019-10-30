import * as dotenv from 'dotenv';
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development'){
	const result = dotenv.config();
	if (result.error) {
		throw result.error;
	}
}

module.exports = {
	APP: {
		NAME: 'Customer Service',
		ENV_CDT_PORT: process.env.ENV_CDT_PORT || process.env.PORT,
		BASE_PATH: '/api/cb/bs/',
		VERSION: '1.0'
	},
	DB: {
		ENV_CDT_CONNECTION: '',
		ENV_CDT_DATABASE_DEBUG: false
	}
};
