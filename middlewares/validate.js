const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// TODO improve implementations 
module.exports = {
    course(obj){
        Joi.validate(obj, { name: Joi.string().min(3).required() })
    },

    user(obj){
        Joi.validate(obj, { 
            name: Joi.string().min(3).max(255).required(),
            email: Joi.string().min(3).max(255).required().email(),
            password: Joi.string().min(3).max(255).regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$/).required()
        })
    },

    userAuth(obj){
        Joi.validate(obj, {
            email: Joi.string().min(3).max(255).required().email(),
            password: Joi.string().min(3).max(255).regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$/).required()
        })
    },
}
