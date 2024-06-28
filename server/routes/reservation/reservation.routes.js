const express = require("express");
const reservationRoutes = express.Router();
const {
    getLastWedMovies,
  } = require("../../controllers/movies/movies.controllers");
  const decodeData = require("../../services/decodeData.services");

reservationRoutes.get("/", async (req, res) => {
  try {
    const lastMovies = await getLastWedMovies(req, res);
    const decMovies = decodeData(lastMovies);
    res.render("layouts/reservation", {
      title: "Réserver un film.",
      movies: decMovies,
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
