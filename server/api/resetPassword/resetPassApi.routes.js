const express = require("express");
const resetPassApiRoutes = express.Router();
const {
  forgotPassword,
  changePassword,
} = require("../../controllers/users/users.controllers");

const {
  postForgotPassValidator,
  validateForgotPass,
} = require("../../middlewares/validator/forgotPass.validator");

const {
  postResetPasswordValidator,
  validateResetPassword,
} = require("../../middlewares/validator/resetPassword.validator");

//get temporary password feature
resetPassApiRoutes.post(
  "/send-temp-pass",
  postForgotPassValidator(),
  validateForgotPass,
  forgotPassword
);

//reset password after reconnection password
resetPassApiRoutes.post(
  "/change-pass",
  postResetPasswordValidator(),
  validateResetPassword,
  changePassword
);

module.exports = resetPassApiRoutes;
