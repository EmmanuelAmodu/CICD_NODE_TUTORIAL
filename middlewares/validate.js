const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// TODO improve implementations 
module.exports = {
    course(obj){
        return Joi.validate(obj, { name: Joi.string().min(3).required() })
    },

    user(obj){
        return Joi.validate(obj, { 
            name: Joi.string().min(3).max(255).required(),
            email: Joi.string().min(3).max(255).required().email(),
            password: Joi.string().min(3).max(255).regex(/^(?=.*[A-Z])(?=.*[!@#$&*_])(?=.*[0-9])(?=.*[a-z]).{8,}$/).required()
        })
    },

    userAuth(obj){
        return Joi.validate(obj, {
            email: Joi.string().min(3).max(255).required().email(),
            password: Joi.string().min(3).max(255).regex(/^(?=.*[A-Z])(?=.*[!@#$&*_])(?=.*[0-9])(?=.*[a-z]).{8,}$/).required()
        })
    },
}
