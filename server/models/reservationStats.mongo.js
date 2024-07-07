const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  movieId: String,
  count: Number,
  date: Date,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
