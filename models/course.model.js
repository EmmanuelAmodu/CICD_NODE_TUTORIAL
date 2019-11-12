const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
});

module.exports = mongoose.model('Courses', courseSchema)
