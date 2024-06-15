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

//get temporary password feature
resetPassApiRoutes.post(
  "/send-temp-pass",
  postForgotPassValidator(),
  validateForgotPass,
  forgotPassword
);
resetPassApiRoutes.post("/change-pass", changePassword);

module.exports = resetPassApiRoutes;
