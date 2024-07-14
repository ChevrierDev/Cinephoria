const express = require('express');
const { getFullReservationInfoById } = require('../../controllers/reservations/reservation.controllers');
const { verifyTokenMiddleware } = require('../../middlewares/verifyReservationToken.middlewares');
const ticketRoutes = express.Router();

// Route pour afficher le ticket
ticketRoutes.get('/:reservationId', verifyTokenMiddleware,   async (req, res) => {
  const { reservationId } = req.params;
  try {
    const reservations = await getFullReservationInfoById(req, res);
    console.log(reservations)
    res.render('layouts/ticket', {
      title: 'Ticket',
      reservations: reservations
    });
  } catch (err) {
    console.log('Error while getting reservation data:', err);
    res.status(500).send('Internal server error');
  }
});

module.exports = ticketRoutes;
