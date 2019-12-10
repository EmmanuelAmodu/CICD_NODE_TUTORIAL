const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true
    },
    author: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0
            },
            message: 'A event should have at least one tag'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: function () {
            return this.isPublished
        },
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

module.exports = mongoose.model('Events', eventSchema)
