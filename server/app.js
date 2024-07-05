require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const favicon = require("serve-favicon");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const configurePassportJWT = require("./config/passportJWT.config");
const { checkUser } = require("./middlewares/enrichUserWithInfo");
const methodOverride = require('method-override');
const flash = require('connect-flash');

//Layout routes import
const accueilRoutes = require("./routes/accueil/accueil.routes");
const filmsRoutes = require("./routes/films/films.routes");
const reservationRoutes = require("./routes//reservation/reservation.routes");
const contactRoutes = require("./routes/contact/contact.routes");
const loginFormRoutes = require("./routes/components/login-form.routes");
const registerFormRoutes = require("./routes/components/register-form.routes");
const resetPasswordRoutes = require("./routes/reset-password/resetPass.routes");
const loginRoutes = require("./routes/login/login.routes");

//Dashboard routes
const userDashboardRoutes = require("./routes/dashboard/users/userDash.routes");
const adminDashboardRoutes = require("./routes/dashboard/admin/adminDash.routes");
const employeeDashboardRoutes = require("./routes/dashboard/employee/employeeDash.routes");

//API routes import
const usersRoutes = require("./api/users/users.routes");
const moviesRoutes = require("./api/movies/movies.routes");
const cinemasRoutes = require("./api/cinemas/cinemas.routes");
const incidentRoutes = require("./api/incident/incident.routes");
const reviewsRoutes = require("./api/reviews/reviews.routes");
const reservationApiRoutes = require("./api/reservation/reservation.routes");
const showtimesRoutes = require("./api/showtimes/showtimes.routes");
const seatsRoutes = require("./api/seats/seats.routes");
const roomsRoutes = require("./api/rooms/rooms.routes");
const resetPassApiRoutes = require("./api/resetPassword/resetPassApi.routes");
const assignRouter = require('./api/assign/assignRouter.routes');

//login and logout API
const authRouter = require("./auth/loginApi");
const logoutRouter = require("./auth/logoutApi");

//components routes
const theater = require('./routes/components/theater.routes')

const app = express();
app.use(methodOverride('_method'))
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    name: "session",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
configurePassportJWT(passport);

app.use(checkUser);
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(
  "/dashboard",
  express.static(path.join(__dirname, "..", "client", "public"))
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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
app.use("/reset", resetPasswordRoutes);
app.use("/login", loginRoutes);

//user Dashboard layout
app.get('/dashboard/employee', (req, res) => {
  res.redirect('/dashboard/employee/films')
})
app.use("/dashboard/user", userDashboardRoutes);
app.use("/dashboard/admin", adminDashboardRoutes);
app.use("/dashboard/employee", employeeDashboardRoutes);

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
app.use("/api/v1/", resetPassApiRoutes);
app.use("/api/v1", assignRouter);

//login and logout API
app.use("/api/v1/", authRouter);
app.use("/api/v1/", logoutRouter);

//form components routes
app.use("/", loginFormRoutes);
app.use("/", registerFormRoutes);
app.use("/", theater);

module.exports = app;
