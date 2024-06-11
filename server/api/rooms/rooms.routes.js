const express = require("express");
const roomsRoutes = express.Router();
const {
  getRooms,
  getRoomsById,
  deleteRoomsById,
  postRooms,
  updateRoomsById,
} = require("../../controllers/rooms/rooms.controllers");

// get all Rooms
roomsRoutes.get("/rooms", getRooms);

// get Rooms by Id
roomsRoutes.get("/rooms/:id", getRoomsById);

// delete Rooms by Id
roomsRoutes.delete("/rooms/:id", deleteRoomsById);

// post Rooms
roomsRoutes.post("/rooms", postRooms);

// update Rooms
roomsRoutes.put("/rooms/:id", updateRoomsById);

module.exports = roomsRoutes;
