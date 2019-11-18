/* eslint-disable no-undef */
require('dotenv').config()
const args = require('minimist')(process.argv.slice(2));

const getDbUrl = (env = args.env) => {
    if (env) {
        switch (env) {
            case 'prod':
                return process.env.MONGOURL;
            case 'dev':
                return process.env.MONGOURL_DEV;
            default:
                return process.env.MONGOURL_STAGING;
        }
    }
    return process.env.MONGOURL_TEST
}

module.exports = {
    port: process.env.PORT,
    env: args.env,
    DEBUG: (env = this.env) => env === 'dev' ? 'app:*' : 'app:error',
    dbUrl: getDbUrl,
    appKey: process.env.SECRET_KEY
}
