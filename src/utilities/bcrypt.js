"use strict";
const bcrypt = require("bcrypt");

module.exports.hashPassword = async (myPlaintextPassword) => {
  try {
    const saltRounds = 10;
    return bcrypt.hashSync(myPlaintextPassword, saltRounds);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
};

module.exports.comparePassword = async (myPlaintextPassword, hash) => {
  try {
    return bcrypt.compareSync(myPlaintextPassword, hash);
  } catch (error) {
    console.error("Error comparing password:", error);
    throw new Error("Error comparing password");
  }
};
