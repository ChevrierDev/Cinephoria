const express = require('express');
const filmsRoutes = express.Router();
const {
    getLastWedMovies,
  } = require("../../controllers/movies/movies.controllers");
  const decodeData = require("../../services/decodeData.services");

filmsRoutes.get('/', async (req, res) =>{
    try {
        const lastMovies = await getLastWedMovies(req, res);
        const decMovies = decodeData(lastMovies);        
        res.render('layouts/films', {
            title: 'Les derniers films disponible.',
            movies: decMovies,
        });
    } catch (err) { 
        console.log("Error while fetching last Wednesday movies:", err);
        res.status(500).render("error", { error: "Internal server error" });
    }
});
filmsRoutes.get('/disponibiliter',(req, res) =>{
    res.render('film/movie-availability', {
        title: 'Les derniers films disponible.'
    });
});


module.exports = filmsRoutes