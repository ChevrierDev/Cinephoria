const express = require("express");
const userDashboardRoutes = express.Router();
const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/autorisation/autorisation");
const {
  enrichUserWithInfo
} = require('../../../middlewares/enrichUserWithInfo');
const {
  getReservationByUserId
} = require('../../../controllers/reservations/reservation.controllers');
const {
  getMovieById
} = require('../../../controllers/movies/movies.controllers')
const decodeData = require('../../../services/decodeData.services');

// user reset password routes
userDashboardRoutes.get(
  "/user/reset-pass",
  checkAuthenticated,
  checkRole("user"),
  (req, res) => {
    const userId = req.user.sub;
    res.render("dashboard/users/userResetPass", {
      title: "Réinitialiser votre mot de passe..",
      id: userId,
    });
  }
);

//users dashboard homePage routes
userDashboardRoutes.get(
  "/",
  checkAuthenticated,
  checkRole("user"),
  enrichUserWithInfo,
  async (req, res) => {
    const user = req.user.details
    const userId = req.user.sub
    const reservation = await getReservationByUserId(userId);
    const decReservation = decodeData(reservation)
    res.render("dashboard/users/users", {
      title: `Bienvenue ${user.first_name}.`,
      reservations: decReservation
    });
  }
);

//users dashboard get review form routes
userDashboardRoutes.get(
  "/reviews-form/:id",
  checkAuthenticated,
  checkRole("user"),
  enrichUserWithInfo,
  async (req, res) => {
    const movies = await getMovieById(req, res);
    const decMovies = decodeData(movies);
    res.render("dashboard/users/reviewForm", {
      title: `Laisser un avis.`,
      currentPath: req.path,
      movies: decMovies
    });
  }
);

module.exports = userDashboardRoutes;
