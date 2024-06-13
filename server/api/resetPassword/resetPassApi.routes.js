const express = require("express");
const resetPassApiRoutes = express.Router();
const {
  forgotPassword,
  changePassword,
} = require("../../controllers/users/users.controllers");


//get temporary password feature
resetPassApiRoutes.post("/send-temp-pass", forgotPassword);
resetPassApiRoutes.post("/change-pass", changePassword);

module.exports = resetPassApiRoutes;
