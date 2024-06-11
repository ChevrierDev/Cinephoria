const express = require("express");
const showtimesRoutes = express.Router();
const {
  getShowtimes,
  getShowtimesById,
  deleteShowtimesById,
  postShowtimes,
  updateShowtimesById,
} = require("../../controllers/showtimes/showtimes.controllers");

// get all showtimes
showtimesRoutes.get("/showtimes", getShowtimes);

// get showtimes by Id
showtimesRoutes.get("/showtimes/:id", getShowtimesById);

// delete showtimes by Id
showtimesRoutes.delete("/showtimes/:id", deleteShowtimesById);

// post showtimes
showtimesRoutes.post("/showtimes", postShowtimes);

// update showtimes
showtimesRoutes.put("/showtimes/:id", updateShowtimesById);

module.exports = showtimesRoutes;
