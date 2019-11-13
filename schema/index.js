const Joi = require('joi')
// TODO move this to middleware
module.exports.course = (obj) => Joi.validate(obj, { name: Joi.string().min(3).required() });
