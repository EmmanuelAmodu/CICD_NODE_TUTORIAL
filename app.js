const mongo = require('./services/mongoose.service')
const config = require('./config')
const app = require('./services/express.service')();

mongo().then(db => {
    console.log(`db name ${db.connections[0].name}`)
    app.listen(config.port, () => console.log(`Listen on port ${config.port}`))
}).catch(err => {
    console.log(err)
})
