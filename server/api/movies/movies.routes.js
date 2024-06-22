const express = require("express");
const moviesRoutes = express.Router();
const {
  getMovies,
  getMovieById,
  deleteMovieById,
  postMovie,
  updateMovieById,
} = require("../../controllers/movies/movies.controllers");
const {
  searchMovies
} = require('../../controllers/search.controllers')
const {
  postMovieValidator,
  validateMovie,
} = require("../../middlewares/validator/movies.validator");

const upload = require("../../middlewares/multer/multer.config");

// get all Movies
moviesRoutes.get("/movies", getMovies);

// search all Movies
moviesRoutes.get("/movies/search", searchMovies);

// get Movie by Id
moviesRoutes.get("/movies/:id", getMovieById);

// delete Movie by Id
moviesRoutes.delete("/movies/:id", deleteMovieById);

// post Movie
moviesRoutes.post(
  "/movies",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "poster", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  postMovieValidator(),
  validateMovie,
  postMovie
);

// update Movie
moviesRoutes.put(
  "/movies/:id",
  postMovieValidator(),
  validateMovie,
  updateMovieById
);

module.exports = moviesRoutes;
