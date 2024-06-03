const express = require('express');
const filmsRoutes = express.Router();

filmsRoutes.get('/',(req, res) =>{
    res.render('layouts/films', {
        title: 'Les derniers films disponible.'
    });
});

module.exports = filmsRoutes