const express = require("express");
const loginRoutes = express.Router();

loginRoutes.get("/", (req, res) => {
  const redirectUrl = req.query.redirect || ''
  res.render("auth/login", {
    
    title: "Connectez-vous à votre compte.",
    redirectUrl 
  });
});

module.exports = loginRoutes;
