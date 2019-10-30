module.exports = {
	APP: {
		NAME: 'COUNDUIT NodeJS Boilerplate',
		ENV_CDT_PORT: process.env.ENV_CDT_PORT || process.env.PORT,
		BASE_PATH: '/api/cb/bs/',
		VERSION: '1.0',
		SECRET: process.env.ENV_CDT_SECRET
	},
	DB: {
		mssql: {
			host: process.env.ENV_DB_HOST,
			options: {
				database: process.env.ENV_DB_NAME,
				encrypt: true,
				port: process.env.ENV_DB_PORT
			},
			password: process.env.ENV_DB_PASSWORD,
			user: process.env.ENV_DB_USERNAME
		},
		oracledb: {
			host: process.env.ENV_DB_HOST,
			port: process.env.ENV_DB_PORT,
			user: process.env.ENV_DB_USERNAME,
			password: process.env.ENV_DB_PASSWORD,
			database: process.env.ENV_DB_NAME
		},
		USERNAME: process.env.ENV_DB_USERNAME,
		PASSWORD: process.env.ENV_DB_PASSWORD,
		HOST: process.env.ENV_DB_HOST,
		DATABASE_NAME: process.env.ENV_DB_NAME,
		PORT: process.env.ENV_DB_PORT,
		DIALECT: process.env.ENV_DB_DIALECT,
		ENV_CDT_DATABASE_DEBUG: false
	}
};
