const express = require("express");
const reservationRoutes = express.Router();
const moment = require("moment");
const {
  getShowtimesByCinema,
  getShowtimes,
  getShowtimesById,
  getJoinInfoShowtimesById,
  getShowtimesByCinemaAndFilm,
  getShowtimesByFilm,
} = require("../../controllers/showtimes/showtimes.controllers");
const {
  getSeatsByRoomId,
  getReservedSeats,
  getSeatCountByRoomId
} = require('../../controllers/seats/seats.controllers')
const {
  getCinemas,
  getCinemaById,
} = require("../../controllers/cinemas/cinemas.controllers");
const { getMovieById } = require("../../controllers/movies/movies.controllers");
const { filterShowtimes } = require("../../services/filterMoviesService");
const decodeData = require("../../services/decodeData.services");
const {
  checkAuthenticated,
} = require("../../middlewares/autorisation/autorisation");

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
      cinemas: cinemas || [], // Passez un tableau vide si aucun cinéma n'est trouvé
      showtimes: decShowtimes || [],
      cinemaId: cinemaId || "",
      currentLocation: req.path,
      message: showtimes.length === 0 ? "Aucune séance disponible." : "",
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
    if (!cinema)
      return res.status(404).render("error", { error: "Cinéma non trouvé" });

    const film = await getMovieById({ params: { id: filmId } }, res);
    if (!film)
      return res.status(404).render("error", { error: "Film non trouvé" });

    const sessions = await getShowtimesByCinemaAndFilm(cinemaId, filmId);

    const groupedSessions = {};
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;

    sessions.forEach((session) => {
      session.showtimes.forEach((showtime) => {
        const localDay = moment(showtime.day, "DD/MM/YYYY").toDate();
        const date = localDay.toISOString().split("T")[0];
        const startDateTimeStr = `${date}T${showtime.start_time}Z`;
        const endDateTimeStr = `${date}T${showtime.end_time}Z`;

        const startDateTime = new Date(startDateTimeStr);
        const endDateTime = new Date(endDateTimeStr);

        if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
          console.error("Invalid date or time value detected", { showtime });
          throw new Error("Invalid date or time value");
        }

        if (!groupedSessions[date]) {
          groupedSessions[date] = [];
        }
        groupedSessions[date].push({
          ...showtime,
          startDateTime,
          endDateTime,
          localDay,
        });
      });
    });

    const uniqueSessions = Object.keys(groupedSessions)
      .sort()
      .map((date) => ({
        day: date,
        showtimes: groupedSessions[date],
      }));

    const uniqueDates = Object.keys(groupedSessions).sort();

    const decFilm = decodeData(film);

    res.render("reservation/choose-session", {
      title: "Choisir une séance pour votre film",
      cinema,
      film: decFilm,
      sessions: uniqueSessions,
      uniqueDates: uniqueDates,
      message:
        uniqueSessions.length === 0
          ? "Aucune séance disponible pour cette date."
          : "",
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
        ),
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

reservationRoutes.get("/login/:id", async (req, res) => {
  const redirectUrl = `/reservation/choisir-place/${req.params.id}`;
  const showtimes = await getJoinInfoShowtimesById(req, res);
  const decShowtimes = decodeData(showtimes);
  res.render("reservation/auth-page", {
    title: "Connectez-vous ou créer un compte.",
    redirectUrl: redirectUrl,
    showtimes: decShowtimes,
  });
});

reservationRoutes.get(
  "/choisir-place/:id",
  checkAuthenticated,
  async (req, res) => {
    const showtimes = await getJoinInfoShowtimesById(req, res);
    const decShowtimes = decodeData(showtimes);
    const roomId = decShowtimes.room_id;
    const seats  = await getSeatsByRoomId(roomId)
    console.log(seats)
    const seatsCount = await getSeatCountByRoomId(roomId);
    const reservedSeats = await getReservedSeats(decShowtimes.showtimes_id);
    res.render("reservation/choose-seat", {
      title: "choisissez des places pour votre scéance.",
      showtimes: decShowtimes,
      seats: seats,
      reservedSeats: reservedSeats,
      seatsCount: seatsCount
    });
  }
);

module.exports = reservationRoutes;
