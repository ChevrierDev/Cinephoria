const express = require('express');
const reservationRoutes = express.Router();

reservationRoutes.get('/',(req, res) =>{
    res.render('layouts/reservation', {
        title: "Réserver un film."
    });
});

reservationRoutes.get('/choisir-sceance',(req, res) =>{
    res.render('reservation/choose-session', {
        title: "Choissir un scéance pour votre film."
    });
});

reservationRoutes.get('/login',(req, res) =>{
    res.render('reservation/auth-page', {
        title: "Connectez-vous ou créer un compte."
    });
});

reservationRoutes.get('/choisir-place',(req, res) =>{
    res.render('reservation/choose-seat', {
        title: "choisissez des places pour votre scéance."
    });
});



module.exports = reservationRoutes