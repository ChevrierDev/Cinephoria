const express = require("express");
const roomsRoutes = express.Router();
const {
  getRooms,
  getRoomsById,
  deleteRoomsById,
  postRooms,
  updateRoomsById,
  postRoomWithSeats,
} = require("../../controllers/rooms/rooms.controllers");
const {
  postRoomsValidator,
  validateRooms,
} = require("../../middlewares/validator/rooms.validator");

// get all Rooms
roomsRoutes.get("/rooms", getRooms);

// get Rooms by Id
roomsRoutes.get("/rooms/:id", getRoomsById);

// delete Rooms by Id
roomsRoutes.delete("/rooms/:id", deleteRoomsById);

// post Rooms
roomsRoutes.post("/rooms", postRoomsValidator(), validateRooms, postRooms);

// post & Rooms
roomsRoutes.post("/addRoomWithSeats", postRoomWithSeats);

// update Rooms
roomsRoutes.put(
  "/rooms/:id",
  postRoomsValidator(),
  validateRooms,
  updateRoomsById
);

module.exports = roomsRoutes;
