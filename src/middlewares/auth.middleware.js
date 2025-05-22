"use strict";

const { jwtUtility } = require("../utilities");
const Model = require("../models");
const { Op } = require("sequelize");
const { session } = Model;

module.exports.auth = async (req, res, next) => {
  let token = req.headers["authorization"] || req.headers["Authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
  }
  token = token.split(" ")[1];

  // Verify the token
  const decode = jwtUtility.verifyAccessToken(token);

  if (!decode) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
  }

  try {
    // Check if the session exists in the database
    const getSession = await session.findOne({
      where: {
        userId: decode.id,
        token: token,
      },
    });

    if (!getSession) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized", data: null });
    }

    // Attach the user information to the request
    req.user = decode;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
  }
};
