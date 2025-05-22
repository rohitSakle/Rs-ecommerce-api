"use strict";
const validatoreMiddleware = require("./validator.middleware");
const authMiddleware = require("./auth.middleware");

module.exports = { validatoreMiddleware, authMiddleware };
