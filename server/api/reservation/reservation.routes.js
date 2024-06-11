const express = require('express');
const reservationApiRoutes = express.Router();
const {getReservation, getReservationById, deleteReservationById, postReservation, updateReservationById} = require('../../controllers/reservations/reservation.controllers');

// get all reservation
reservationApiRoutes.get('/reservation', getReservation);

// get reservation by Id
reservationApiRoutes.get('/reservation/:id', getReservationById);

// delete reservation by Id
reservationApiRoutes.delete('/reservation/:id', deleteReservationById);

// post reservation
reservationApiRoutes.post('/reservation', postReservation);

// update reservation
reservationApiRoutes.put('/reservation/:id', updateReservationById);

module.exports = reservationApiRoutes;