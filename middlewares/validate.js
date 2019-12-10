const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// TODO improve implementations 
module.exports = {
    event(obj){
        return Joi.validate(obj, { 
            name: Joi.string().min(3).required(),
            isPublished: Joi.boolean().optional(),
            tags: Joi.array().required(),
            category: Joi.string().min(3).max(255).required(),
            _id: Joi.string().optional(),
            price: Joi.number().optional()
        })
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
