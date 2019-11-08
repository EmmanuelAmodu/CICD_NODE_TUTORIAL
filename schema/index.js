const Joi = require('joi')

module.exports.course = (obj) => Joi.validate(obj, { name: Joi.string().min(3).required() });
