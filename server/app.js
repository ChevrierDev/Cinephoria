require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const favicon = require("serve-favicon");
const accueilRoutes = require("./routes/accueil/accueil.routes");
const filmsRoutes = require("./routes/films/films.routes");
const reservationRoutes = require("./routes//reservation/reservation.routes");
const contactRoutes = require("./routes/contact/contact.routes");
const loginFormRoutes = require("./routes/components/login-form.routes");
const registerFormRoutes = require("./routes/components/register-form.routes");

//api routes
const usersRoutes = require("./api/users/users.routes");
const moviesRoutes = require("./api/movies/movies.routes");
const cinemasRoutes = require('./api/cinemas/cinemas.routes');
const incidentRoutes = require('./api/incident/incident.routes');
const reviewsRoutes = require('./api/reviews/reviews.routes');
const reservationApiRoutes = require('./api/reservation/reservation.routes');
const showtimesRoutes = require('./api/showtimes/showtimes.routes');
const seatsRoutes = require('./api/seats/seats.routes');
const roomsRoutes = require('./api/rooms/rooms.routes')


const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(
  favicon(
    path.join(__dirname, "..", "client", "public", "images", "logo-blanc.png")
  )
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "client", "views"));


// Layouts application's routes
app.get("/", (req, res) => {
  res.redirect("/accueil");
});
app.use("/accueil", accueilRoutes);
app.use("/films", filmsRoutes);
app.use("/reservation", reservationRoutes);
app.use("/contact", contactRoutes);

//API routes
app.use("/api/v1/", usersRoutes);
app.use("/api/v1/", moviesRoutes);
app.use("/api/v1/", cinemasRoutes);
app.use("/api/v1/", incidentRoutes);
app.use("/api/v1/", reviewsRoutes);
app.use("/api/v1/", reservationApiRoutes);
app.use("/api/v1/", showtimesRoutes);
app.use("/api/v1/", seatsRoutes);
app.use("/api/v1/", roomsRoutes);

//login route
app.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Connectez-vous à votre compte.",
  });
});

//form components routes
app.use("/", loginFormRoutes);
app.use("/", registerFormRoutes);

module.exports = app;
