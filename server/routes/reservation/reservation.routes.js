const express = require("express");
const reservationRoutes = express.Router();
const {
  getShowtimesByCinema,
  getShowtimes,
} = require("../../controllers/showtimes/showtimes.controllers");
const {
  getCinemas,
  getCinemaById,
} = require("../../controllers/cinemas/cinemas.controllers");
const { getMovieById } = require("../../controllers/movies/movies.controllers");
const {
  getShowtimesByCinemaAndFilm,
  getShowtimesByFilm,
} = require("../../controllers/showtimes/showtimes.controllers");
const { filterShowtimes } = require("../../services/filterMoviesService");
const decodeData = require("../../services/decodeData.services");

reservationRoutes.get("/", async (req, res) => {
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

    const cinemas = await getCinemas(req, res);
    const decShowtimes = decodeData(showtimes);
    res.render("layouts/reservation", {
      title: "Réserver un film.",
      cinemas: cinemas,
      showtimes: decShowtimes,
      cinemaId: cinemaId || "",
      currentLocation: req.path,
    });
  } catch (err) {
    console.log("Error while fetching last Wednesday movies:", err);
    res.status(500).render("error", { error: "Internal server error" });
  }
});

reservationRoutes.get("/choisir-sceance/:cinemaId", async (req, res) => {
  const cinemaId = req.params.cinemaId;
  const filmId = req.query.filmId;

  try {
    const cinema = await getCinemaById({ params: { id: cinemaId } }, res);
    if (!cinema) return;

    const film = await getMovieById({ params: { id: filmId } }, res);
    if (!film) return;

    const sessions = await getShowtimesByCinemaAndFilm(cinemaId, filmId);

    // Trier les séances par date croissante
    sessions.forEach((session) => {
      session.showtimes.sort((a, b) => new Date(a.day) - new Date(b.day));
    });

    const decFilm = decodeData(film);

    res.render("reservation/choose-session", {
      title: "Choisir une séance pour votre film",
      cinema,
      film: decFilm,
      sessions,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


reservationRoutes.get("/get-sessions", async (req, res) => {
  const date = req.query.date;
  const cinemaId = req.query.cinemaId === "null" ? null : req.query.cinemaId;
  const filmId = req.query.filmId;

  try {
    console.log(
      `Fetching sessions for date: ${date}, cinemaId: ${cinemaId}, filmId: ${filmId}`
    );

    let sessions;
    if (cinemaId) {
      sessions = await getShowtimesByCinemaAndFilm(cinemaId, filmId);
    } else {
      sessions = await getShowtimesByFilm(filmId);
    }

    console.log(`Sessions retrieved: ${JSON.stringify(sessions, null, 4)}`);

    if (!sessions || sessions.length === 0) {
      console.log("No sessions found");
      return res.status(404).json({ error: "No sessions found for this date" });
    }

    const filteredSessions = sessions
      .map((session) => ({
        ...session,
        showtimes: session.showtimes.filter(
          (showtime) =>
            new Date(showtime.day).toISOString().split("T")[0] === date
        )
      }))
      .filter((session) => session.showtimes.length > 0);

    if (filteredSessions.length === 0) {
      console.log("No sessions found for the specified date");
      return res.status(404).json({ error: "No sessions found for this date" });
    }

    res.json(filteredSessions);
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


reservationRoutes.get("/login", (req, res) => {
  res.render("reservation/auth-page", {
    title: "Connectez-vous ou créer un compte.",
  });
});

reservationRoutes.get("/choisir-place", (req, res) => {
  res.render("reservation/choose-seat", {
    title: "choisissez des places pour votre scéance.",
  });
});

module.exports = reservationRoutes;
