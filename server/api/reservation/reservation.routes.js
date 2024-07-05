const express = require("express");
const reservationApiRoutes = express.Router();
const {
  getReservation,
  getAllReservationInfoById,
  getReservationByUserId,
  getReservationById,
  deleteReservationById,
  postReservation,
  updateReservationById,
} = require("../../controllers/reservations/reservation.controllers");

const {
  postReservationValidator,
  validateReservation,
} = require("../../middlewares/validator/reservation.validator");

// get all reservation
reservationApiRoutes.get("/reservation", getReservation);

// get all reservation by user Id
reservationApiRoutes.get("/reservation/user", getReservationByUserId);

// get reservation info by Id using POST
reservationApiRoutes.post("/reservation/info", getAllReservationInfoById);

// get reservation by Id
reservationApiRoutes.get("/reservation/:id", getReservationById);

// delete reservation by Id
reservationApiRoutes.delete("/reservation/:id", deleteReservationById);

// post reservation
reservationApiRoutes.post(
  "/reservation",
  postReservationValidator(),
  validateReservation,
  postReservation
);

// update reservation
reservationApiRoutes.put(
  "/reservation/:id",
  postReservationValidator(),
  validateReservation,
  updateReservationById
);

module.exports = reservationApiRoutes;
