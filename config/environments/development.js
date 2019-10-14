import * as dotenv from 'dotenv';
dotenv.config({ debug: process.env.DEBUG })
export default {
    APP: {
        ENV_CDT_PORT: process.env.ENV_CDT_PORT
    },
    DB: {
        ENV_CDT_CONNECTION: '',
        ENV_CDT_DATABASE_DEBUG: false
    }
}