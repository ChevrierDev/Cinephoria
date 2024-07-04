const express = require("express");
const authRouter = express.Router();
const { authUser } = require('./controllers/authentification.controllers');
const {isLogged} = require('../middlewares/autorisation/autorisation')

authRouter.post("/auth", authUser);
authRouter.get("/isLogged", isLogged);

module.exports = authRouter;
