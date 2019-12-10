const config = require('./config')

async function main(app, mongoose) {
    try {
        const db = await mongoose.connect(config.dbUrl())
        return app.listen(config.port, () => console.log(`Listen on port ${config.port}`))
    } catch (error) {
        return new Error('App initailization failed')
    }
}

module.exports = main
