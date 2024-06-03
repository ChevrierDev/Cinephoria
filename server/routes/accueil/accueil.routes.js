const express = require('express');
const accueilRoutes = express.Router();

accueilRoutes.get('/',(req, res) =>{
    res.render('layouts/accueil', {
        title: 'bienvenue à Cinéphoria.'
    });
});

module.exports = accueilRoutes