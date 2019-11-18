const mongoose = require('mongoose')
const config = require('./config')
const app = require('./services/express.service')()

async function main() {
    try {
        const db = await mongoose.connect(config.dbUrl())
        if (db) {
            console.log(`db name ${db.connections[0].name}`)
            return app.listen(config.port, () => console.log(`Listen on port ${config.port}`))
        }
        return new Error('App could not be started due to db connectivity issues')
    } catch (error) {
        return new Error('App initailization failed')
    }
}

module.exports = main()
