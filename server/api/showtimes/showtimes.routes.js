const express = require("express");
const showtimesRoutes = express.Router();
const {
  getShowtimes,
  getShowtimesById,
  deleteShowtimesById,
  postShowtimes,
  getShowtimesByCinemaAndRoom,
  updateShowtimesById,
} = require("../../controllers/showtimes/showtimes.controllers");

const {
  postShowtimesValidator,
  validateShowtimes,
} = require("../../middlewares/validator/showtimes.validator");

// get all showtimes
showtimesRoutes.get("/showtimes", getShowtimes);

// get all showtimes by cinemas and rooms
showtimesRoutes.get('/getShowtimesByCinemaAndRoom/:cinemaId/:roomId', getShowtimesByCinemaAndRoom);

// get showtimes by Id
showtimesRoutes.get("/showtimes/:id", getShowtimesById);

// delete showtimes by Id
showtimesRoutes.delete("/showtimes/:id", deleteShowtimesById);

// post showtimes
showtimesRoutes.post(
  "/showtimes",
  postShowtimesValidator(),
  validateShowtimes,
  postShowtimes
);

// update showtimes
showtimesRoutes.put(
  "/showtimes/:id",
  postShowtimesValidator(),
  validateShowtimes,
  updateShowtimesById
);

module.exports = showtimesRoutes;
