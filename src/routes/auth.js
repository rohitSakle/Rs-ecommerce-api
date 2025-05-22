"use strict";
const router = require("express").Router();
const { authController } = require("../controllers");

const { validatoreMiddleware, authMiddleware } = require("../middlewares");
const { authValidation } = require("../validations");

router.post(
  "/register",
  validatoreMiddleware.validate(authValidation.registerSchema),
  authController.register
);

router.post(
  "/login",
  validatoreMiddleware.validate(authValidation.signinSchema),
  authController.login
);

router.post(
  "/refresh-token",
  validatoreMiddleware.validate(authValidation.signinSchema),
  authController.refreshToken
);
router.post("/logout", authMiddleware.auth, authController.logout);

module.exports = router;
