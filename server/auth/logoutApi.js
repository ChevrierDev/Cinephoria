const express = require('express');
const logoutRouter = express.Router();

logoutRouter.post('/', (req, res) => {
    console.log("Déconnection wanted");
    res.clearCookie('token');
    res.redirect('/accueil');
});



module.exports = logoutRouter;