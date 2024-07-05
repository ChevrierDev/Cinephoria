const express = require("express");
const accueilRoutes = express.Router();
const {
  getLastWedMovies,
} = require("../../controllers/movies/movies.controllers");
const decodeData = require("../../services/decodeData.services");

accueilRoutes.get("/", async (req, res) => {
  try {
    const lastMovies = await getLastWedMovies(req, res);
    const decMovies = decodeData(lastMovies);
    res.render("layouts/accueil", {
      title: "Bienvenue à Cinéphoria.",
      lastMovies: decMovies, 
    });
  } catch (err) {
    console.log("Error while fetching last Wednesday movies:", err);
    res.status(500).render("error", { error: "Internal server error" });
  }
});

module.exports = accueilRoutes;
