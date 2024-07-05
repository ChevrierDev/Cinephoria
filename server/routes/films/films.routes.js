const express = require("express");
const filmsRoutes = express.Router();
const {
  getLastWedMovies,
  getMovies,
  getMovieById
} = require("../../controllers/movies/movies.controllers");
const {
  getShowtimesWithMovies,
  getShowtimesByFilm,
  getShowtimesByCinema,
  getShowtimes,
} = require("../../controllers/showtimes/showtimes.controllers");
const { getCinemas } = require("../../controllers/cinemas/cinemas.controllers");
const decodeData = require("../../services/decodeData.services");
const {
  filterMovies,
  filterShowtimes
} = require('../../services/filterMoviesService')

filmsRoutes.get("/", async (req, res) => {
  try {
    const { genres, days, qualities, cinemaId } = req.query;
    let showtimes = [];

    if (cinemaId) {
      showtimes = await getShowtimesByCinema(cinemaId);
    } else {
      showtimes = await getShowtimes();
    }

    if (genres || days || qualities) {
      showtimes = filterShowtimes(showtimes, genres, days, qualities);
    }

    const lastMovies = await getLastWedMovies(req, res);
    const movies = await getMovies(req, res);
    const cinemas = await getCinemas(req, res);
    const decLastMovies = decodeData(lastMovies);
    const decMovies = decodeData(movies);
    const decShowtimes = decodeData(showtimes);
    const filteredMovies = filterMovies(decLastMovies, genres, days, qualities);
    const filterCurrentMovies = filterMovies(decMovies, genres, days, qualities);
    console.log(decShowtimes[0])
   

    res.render("layouts/films", {
      title: "Les derniers films disponible.",
      lastMovies: filteredMovies,
      cinemas: cinemas,
      showtimes: decShowtimes,
      movies: filterCurrentMovies,
      cinemaId: cinemaId || "",
      currentLocation: req.path,
    });
  } catch (err) {
    console.log("Error while fetching last Wednesday movies:", err);
    res.status(500).render("error", { error: "Internal server error" });
  }
});


filmsRoutes.get("/disponibiliter/:id", async (req, res) => {
  const filmId = req.params.id;
  const movie = await getMovieById(req, res);
  const cinemas = await getCinemas(req, res);
  const showtimes = await getShowtimesByFilm(filmId);

  // Filtrer les cinémas français et associer les séances
  const frenchCinemas = cinemas.filter(cinema => cinema.country.toLowerCase() === 'france');
  const cinemaShowtimes = frenchCinemas.map(cinema => {
    const cinemaShowtime = showtimes.find(show => show.cinema_id === cinema.cinema_id);
    return {
      ...cinema,
      showtimes: cinemaShowtime ? cinemaShowtime.showtimes : null
    };
  });

  const decMovies = decodeData(movie);
  res.render("film/movie-availability", {
    title: "Les derniers films disponible.",
    movie: decMovies,
    cinemas: cinemaShowtimes,
    filmId: filmId
  });
});




module.exports = filmsRoutes;
