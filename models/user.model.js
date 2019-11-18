const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const config = require('../config')
const roles = ['super-admin', 'admin', 'client', 'user']

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    role: {
        type: String,
        default: 'user',
        enum: roles
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

userSchema.methods = {
    generateAuthToken() {
        const user = _.pick(this, ['_id', 'name', 'email', 'isVerified', 'role'])
        return jwt.sign(user, config.appKey, {
            expiresIn: '14d'
        })
    }
}

userSchema.statics = {
    getRoles() {
        return roles
    },

    async _generateHash(next) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next();
    }
}

userSchema.pre('save', userSchema.statics._generateHash)

module.exports = mongoose.model('Users', userSchema)
