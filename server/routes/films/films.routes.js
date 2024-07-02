const express = require("express");
const filmsRoutes = express.Router();
const {
  getLastWedMovies,
  getMovies,
} = require("../../controllers/movies/movies.controllers");
const {
  getShowtimesWithMovies,
  getShowtimesByCinema,
  getShowtimes,
} = require("../../controllers/showtimes/showtimes.controllers");
const { getCinemas } = require("../../controllers/cinemas/cinemas.controllers");
const decodeData = require("../../services/decodeData.services");

filmsRoutes.get("/", async (req, res) => {
  try {
    const { genres, days, qualities, cinemaId } = req.query;
    let showtimes = [];

    if (cinemaId) {
      showtimes = await getShowtimesByCinema(cinemaId);
    } else {
      showtimes = await getShowtimes();
    }

    const lastMovies = await getLastWedMovies(req, res);
    const movies = await getMovies(req, res);
    const cinemas = await getCinemas(req, res);
    const decLastMovies = decodeData(lastMovies);
    const decMovies = decodeData(movies);
    const decShowtimes = decodeData(showtimes);
    res.render("layouts/films", {
      title: "Les derniers films disponible.",
      lastMovies: decLastMovies,
      cinemas: cinemas,
      showtimes: decShowtimes,
      movies: decMovies,
      cinemaId: cinemaId || "",
      currentLocation: req.path,
    });
  } catch (err) {
    console.log("Error while fetching last Wednesday movies:", err);
    res.status(500).render("error", { error: "Internal server error" });
  }
});

filmsRoutes.get("/disponibiliter", (req, res) => {
  res.render("film/movie-availability", {
    title: "Les derniers films disponible.",
  });
});

module.exports = filmsRoutes;
