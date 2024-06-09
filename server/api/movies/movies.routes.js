const express = require('express');
const moviesRoutes = express.Router();
const {getMovies, getMovieById, deleteMovieById, postMovie} = require('../../controllers/movies/movies.controllers');

// get all Movies
moviesRoutes.get('/movies', getMovies);

// get Movie by Id
moviesRoutes.get('/movies/:id', getMovieById);

// delete Movie by Id
moviesRoutes.delete('/movies/:id', deleteMovieById);

// post Movie
moviesRoutes.post('/movies', postMovie);

module.exports = moviesRoutes;