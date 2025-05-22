"use strict";
const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

module.exports.generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

module.exports.generateRefreshToken = (user) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

// module.exports.verifyAccessToken = (token) => {
//   return jwt.verify(token, ACCESS_TOKEN_SECRET);
// };

module.exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};
