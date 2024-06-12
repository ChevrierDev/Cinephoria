const express = require("express");
const authRouter = express.Router();
const { authUser } = require('./controllers/login.controllers')

authRouter.post("/auth", authUser);

module.exports = authRouter;
