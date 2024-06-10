const express = require("express");
const cinemasRoutes = express.Router();
const {
  getCinemas,
  getCinemaById,
  postCinema,
  updateCinemaById,
  deleteCinemaById,
} = require("../../controllers/cinemas/cinemas.controllers");
const {
  postCinemasValidator,
  validateCinemas,
} = require("../../middlewares/validator/cinemas.validator");

// get all Cinemas
cinemasRoutes.get("/cinemas", getCinemas);

// get Cinema by Id
cinemasRoutes.get("/cinemas/:id", getCinemaById);

// post Cinema
cinemasRoutes.post(
  "/cinemas",
  postCinemasValidator(),
  validateCinemas,
  postCinema
);

// Update Cinema by Id
cinemasRoutes.put(
  "/cinemas/:id",
  postCinemasValidator(),
  validateCinemas,
  updateCinemaById
);

// delete Cinema by Id
cinemasRoutes.delete("/cinemas/:id", deleteCinemaById);

module.exports = cinemasRoutes;
