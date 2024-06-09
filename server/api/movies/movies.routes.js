const express = require('express');
const moviesRoutes = express.Router();
const {getMovies, getMovieById, deleteMovieById, postMovie, updateMovieById} = require('../../controllers/movies/movies.controllers');
const  { postMovieValidator, validateMovie } = require('../../middlewares/validator/movies.validator')


// get all Movies
moviesRoutes.get('/movies', getMovies);

// get Movie by Id
moviesRoutes.get('/movies/:id', getMovieById);

// delete Movie by Id
moviesRoutes.delete('/movies/:id',  deleteMovieById);

// post Movie
moviesRoutes.post('/movies',postMovieValidator(), validateMovie, postMovie);

// update Movie
moviesRoutes.put('/movies/:id',postMovieValidator(), validateMovie, updateMovieById);

module.exports = moviesRoutes;