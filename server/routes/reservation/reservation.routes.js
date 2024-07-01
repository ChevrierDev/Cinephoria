const express = require("express");
const reservationRoutes = express.Router();
const {
  getShowtimesByCinema,
  getShowtimes,
} = require("../../controllers/showtimes/showtimes.controllers");
const { getCinemas } = require("../../controllers/cinemas/cinemas.controllers");
const { filterShowtimes } = require("../../services/filterMoviesService");
const decodeData = require("../../services/decodeData.services");

reservationRoutes.get("/", async (req, res) => {
  try {
    const { genres, days, qualities, cinemaId } = req.query;
    let showtimes = [];

    if (cinemaId) {
      showtimes = await getShowtimesByCinema(cinemaId);
    } else {
      showtimes = await getShowtimes();
    }

    if (genres || days || qualities) {
      showtimes = filterShowtimes(showtimes, genres, days, qualities);
    }

    const cinemas = await getCinemas(req, res);
    const decShowtimes = decodeData(showtimes);
    res.render("layouts/reservation", {
      title: "Réserver un film.",
      cinemas: cinemas,
      showtimes: decShowtimes,
      cinemaId: cinemaId || '',
    });
  } catch (err) {
    console.log("Error while fetching last Wednesday movies:", err);
    res.status(500).render("error", { error: "Internal server error" });
  }
});

reservationRoutes.get("/choisir-sceance", (req, res) => {
  res.render("reservation/choose-session", {
    title: "Choisir un scéance pour votre film.",
  });
});

reservationRoutes.get("/login", (req, res) => {
  res.render("reservation/auth-page", {
    title: "Connectez-vous ou créer un compte.",
  });
});

reservationRoutes.get("/choisir-place", (req, res) => {
  res.render("reservation/choose-seat", {
    title: "choisissez des places pour votre scéance.",
  });
});

module.exports = reservationRoutes;
