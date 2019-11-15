const mongo = require('./services/mongoose.service')
const config = require('./config')
const app = require('./services/express.service')()

async function main(app) {
    try {
        const db = await mongo()
        if (db) {
            console.log(`db name ${db.connections[0].name}`)
            app.listen(config.port, () => console.log(`Listen on port ${config.port}`))
            return db
        } else {
            console.log('App could not be started due to db connectivity issues')
            return null
        }

    } catch (error) {
        console.log(error)
        return null
    }
}

main(app)
