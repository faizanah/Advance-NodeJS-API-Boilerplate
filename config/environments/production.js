module.exports = {
	APP: {
		NAME: 'COUNDUIT NodeJS Boilerplate',
		ENV_CDT_PORT: process.env.ENV_CDT_PORT || process.env.PORT,
		BASE_PATH: '/api/cb/bs/',
		VERSION: '1.0',
		SECRET: process.env.ENV_CDT_SECRET
	},
	DB: {
		USERNAME: process.env.ENV_CDT_DB_USERNAME,
		PASSWORD: process.env.ENV_DB_PASSWORD,
		HOST: process.env.ENV_CDT_DB_HOST,
		DATABASE_NAME: process.env.ENV_DB_NAME,
		PORT: process.env.ENV_DB_PORT,
		DIALECT: process.env.ENV_DB_DIALECT,
		ENV_CDT_DATABASE_DEBUG: false
	}
};
