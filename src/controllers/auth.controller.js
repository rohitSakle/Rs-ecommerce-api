"use strict";
const Model = require("../models");
const { Op } = require("sequelize");
const { user, session } = Model;

const { bcryptUtility, jwtUtility } = require("../utilities");

module.exports.register = async (req, res) => {
  const { userName, email, password, role } = req.body;
  let transaction;
  try {
    // Check if the user already exists
    transaction = await Model.sequelize.transaction();

    const existingUser = await user.findOne({
      where: {
        [Op.or]: [{ userName }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptUtility.hashPassword(password);

    // Create a new user
    await user.create(
      {
        userName,
        email,
        password: hashedPassword,
        role,
      },
      { transaction }
    );

    await transaction.commit();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: null,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: [] });
  }
};

module.exports.login = async (req, res, next) => {
  const { signInId, password } = req.body;
  let transaction;
  try {
    transaction = await Model.sequelize.transaction();

    const existUser = await user.findOne({
      where: {
        [Op.or]: [{ userName: signInId }, { email: signInId }],
      },
    });

    if (!existUser) {
      return res
        .status(401)
        .json({ success: false, message: "Invalide credentails", data: null });
    }

    //compare password
    const isPasswordValid = await bcryptUtility.comparePassword(
      password,
      existUser.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalide credentails", data: null });
    }

    const access_token = jwtUtility.generateAccessToken({
      id: existUser.id,
      role: existUser.role,
    });
    const refersh_token = jwtUtility.generateRefreshToken({
      id: existUser.id,
    });

    await session.destroy({ where: { userId: existUser.id } }, { transaction }); //single session
    await session.create(
      { userId: existUser.id, token: access_token },
      { transaction }
    );
    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "login successful",
      data: { access_token, refersh_token },
    });
  } catch (error) {
    console.error("Error during login:", error);
    await transaction.rollback();
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

module.exports.refreshToken = async (req, res, next) => {
  const { refresh_token } = req.body;
  let transaction;
  try {
    transaction = await Model.sequelize.transaction();

    // Verify the refresh token
    const decoded = jwtUtility.verifyRefreshToken(refresh_token);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid refresh token", data: null });
    }

    // Check if the session exists in the database
    const getSession = await session.findOne({
      where: {
        userId: decoded.id,
        token: refresh_token,
      },
    });

    if (!getSession) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized", data: null });
    }

    const access_token = jwtUtility.generateAccessToken({
      id: decoded.id,
      role: decoded.role,
    });

    await session.destroy({ where: { userId: decoded.id } }, { transaction });
    await session.create(
      { userId: decoded.id, token: access_token },
      { transaction }
    );
    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: { access_token },
    });
  } catch (error) {
    console.error("Error during token refresh:", error);
    await transaction.rollback();
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

module.exports.logout = async (req, res, next) => {
  console.log("Logout called", req.user);
  const { id: userId } = req.user;
  let transaction;
  try {
    transaction = await Model.sequelize.transaction();
    await session.destroy({ where: { userId } }, { transaction });
    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Logout successful",
      data: null,
    });
  } catch (error) {
    console.error("Error during logout:", error);
    await transaction.rollback();
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};
