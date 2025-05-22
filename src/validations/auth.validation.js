"use strict";
const Joi = require("joi");

module.exports.registerSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("admin", "customer", "seller", "guest").required(),
}).required();

module.exports.signinSchema = Joi.object({
  signInId: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
}).required();
