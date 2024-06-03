const express = require('express');
const filmsRoutes = express.Router();

filmsRoutes.get('/',(req, res) =>{
    res.render('layouts/films', {
        title: 'Les derniers films disponible.'
    });
});
filmsRoutes.get('/disponibiliter',(req, res) =>{
    res.render('layouts/movie-availability', {
        title: 'Les derniers films disponible.'
    });
});


module.exports = filmsRoutes