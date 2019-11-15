/* eslint-disable no-undef */
require('dotenv').config()
const args = require('minimist')(process.argv.slice(2));

const getDbUrl = (env = args.env) => {
    if (env) {
        if (env === 'prod') return process.env.MONGOURL;
        else if (env === 'dev') return process.env.MONGOURL_DEV;
        else if (env === 'staging') return process.env.MONGOURL_STAGING;
    }
    return process.env.MONGOURL_TEST
}

module.exports = {
    port: process.env.PORT,
    env: args.env,
    DEBUG: this.env === 'dev' ? 'app:*' : 'app:error',
    dbUrl: getDbUrl,
    appKey: process.env.SECRET_KEY
}
