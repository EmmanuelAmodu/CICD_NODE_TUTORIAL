const mongoose = require('mongoose')

// TODO refactor
module.exports = async function () {
    try {
        const db = await new Promise((resolve, reject) => {
            mongoose.connect('mongodb://localhost:27017/')
                .then(db => {
                    console.log('successfully connected to mongodb')
                    resolve(db)
                }).catch(err => {
                    console.log('failed to connect to mongodb', err)
                    reject(err)
                });
            return db
        })
    } catch (error) {
        return null
    }
}
