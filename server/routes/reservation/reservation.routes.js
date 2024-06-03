const express = require('express');
const reservationRoutes = express.Router();

reservationRoutes.get('/',(req, res) =>{
    res.render('layouts/reservation', {
        title: "Réserver un film."
    });
});

module.exports = reservationRoutes