import * as dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
module.exports = {
    app: {
        ENV_CDT_PORT:  process.env.ENV_CDT_PORT
    }
}