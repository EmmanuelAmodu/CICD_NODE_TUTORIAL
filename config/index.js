/* eslint-disable no-undef */
require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    DEBUG: process.env.NODE_ENV === 'dev' ? 'app:*' : 'app:error',
    dbUrl: process.env.MONGOURL,
    dbName: process.env.DBNAME,
    appKey: process.env.SECRET_KEY
}
