const express = require("express");
const seatsRoutes = express.Router();
const {
  getSeats,
  getSeatsById,
  deleteSeatsById,
  getRoomsSeatsByCinemaId,
  postSeats,
  updateSeatsById,
  getSeatsByRoomIdApi
} = require("../../controllers/seats/seats.controllers");
const { postSeatsValidator, validateSeats } = require('../../middlewares/validator/seats.validator');

// get all seats
seatsRoutes.get("/seats", getSeats);

// get all Rooms and seats by cinema ID
seatsRoutes.get("/roomsAndSeats/:id", getRoomsSeatsByCinemaId);

// get all seats by rooms ID
seatsRoutes.get("/seatsByRooms/:id", getSeatsByRoomIdApi);

// get seats by Id
seatsRoutes.get("/seats/:id", getSeatsById);

// delete seats by Id
seatsRoutes.delete("/seats/:id", deleteSeatsById);

// post seats
seatsRoutes.post("/seats",postSeatsValidator(), validateSeats, postSeats);

// update seats
seatsRoutes.put("/seats/:id",postSeatsValidator(), validateSeats, updateSeatsById);

module.exports = seatsRoutes;
