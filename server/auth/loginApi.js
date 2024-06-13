const express = require("express");
const authRouter = express.Router();
const { authUser } = require('./controllers/authentification.controllers')

authRouter.post("/auth", authUser);

module.exports = authRouter;
