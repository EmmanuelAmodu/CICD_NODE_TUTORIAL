const mongoose = require('mongoose')
const config = require('../config')

// TODO refactor
module.exports = async function () {
    try {
        const db = await new Promise((resolve, reject) => {
            console.log(config.dbUrl)
            mongoose.connect(config.dbUrl())
            .then(db => {
                console.log('successfully connected to mongodb')
                resolve(db)
            }).catch(err => {
                console.log('failed to connect to mongodb', err)
                reject(err)
            });
        })
        return db
    } catch (error) {
        return null
    }
}
