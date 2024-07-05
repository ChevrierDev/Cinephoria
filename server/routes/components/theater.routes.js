const express = require('express');
const theater = express.Router();
const { getCinemas } = require('../../controllers/cinemas/cinemas.controllers'); 
const { getShowtimesByFilm } = require('../../controllers/showtimes/showtimes.controllers')

theater.get("/cinemas/france/:filmId", async (req, res) => {
  const filmId = req.params.filmId;
  const allCinemas = await getCinemas(req, res);
  const showtimes = await getShowtimesByFilm(filmId);

  const cinemaShowtimes = allCinemas.filter(cinema => cinema.country.toLowerCase() === 'france').map(cinema => {
    const showtime = showtimes.find(show => show.cinema_name === cinema.name);
    return {
      ...cinema,
      showtime: showtime ? showtime.showtimes[0] : null
    };
  });

  res.render("components/france-theater-card", { cinemas: cinemaShowtimes, filmId: filmId });
});

theater.get("/cinemas/belgique/:filmId", async (req, res) => {
  const filmId = req.params.filmId;
  const allCinemas = await getCinemas(req, res);
  const showtimes = await getShowtimesByFilm(filmId);

  const cinemaShowtimes = allCinemas.filter(cinema => cinema.country.toLowerCase() === 'belgique').map(cinema => {
    const showtime = showtimes.find(show => show.cinema_name === cinema.name);
    return {
      ...cinema,
      showtime: showtime ? showtime.showtimes[0] : null
    };
  });

  res.render("components/belgium-theater-card", { cinemas: cinemaShowtimes,  filmId: filmId });
});

module.exports = theater;