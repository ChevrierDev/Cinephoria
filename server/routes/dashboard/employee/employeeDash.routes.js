const express = require("express");
const employeeDashboardRoutes = express.Router();
const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/autorisation/autorisation");
const {
  enrichUserWithInfo
} = require('../../../middlewares/enrichUserWithInfo');

const {
  getMovieById
} = require('../../../controllers/movies/movies.controllers');

const {
  getRooms
} = require('../../../controllers/rooms/rooms.controllers')

const {
  getCinemas
} = require('../../../controllers/cinemas/cinemas.controllers')

//employee dashboard homePage routes
employeeDashboardRoutes.get(
  "/films",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details;
    res.render("dashboard/employee/employee", {
      title: `Bienvenue ${user.first_name}.`,
    });
  }
);

//employee dashboard films routes
employeeDashboardRoutes.get(
  "/films/add",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details;
    res.render("dashboard/employee/addFilm", {
      title: `Bienvenue ${user.first_name}.`,
    });
  }
);

//employee dashboard add films routes
employeeDashboardRoutes.get(
  "/films/update",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details;
    res.render("dashboard/employee/updateFilm", {
      title: `Bienvenue ${user.first_name}.`,
    });
  }
);

//employee dashboard update films layouts routes
employeeDashboardRoutes.get(
  "/films/update/:id",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    const movie = await getMovieById(req, res);
    res.render("dashboard/employee/update", {
      title: `Modifier le film.`,
      movie : movie
    });
    
  }
);

//employee dashboard delete films routes
employeeDashboardRoutes.get(
  "/films/delete",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details;
    res.render("dashboard/employee/deleteFilm", {
      title: `Bienvenue ${user.first_name}.`,
    });
  }
);

//employee dashboard reviews routes
employeeDashboardRoutes.get(
  "/reviews",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details;
    res.render("dashboard/employee/reviews", {
      title: `Bienvenue ${user.first_name}.`,
    });
  }
);



//employee dashboard rooms layouts routes
employeeDashboardRoutes.get(
  "/rooms",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/employee/rooms", {
      title: `Modifier ou ajouter des salle dans vos cinémas.`,
    });
  }
);

//employee dashboard add rooms layouts routes
employeeDashboardRoutes.get(
  "/rooms/add",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    try {
      const cinemas = await getCinemas(req, res)
      res.render("dashboard/employee/addRooms", {
        title: `Ajouter une salle à votre cinéma.`,
        cinemas: cinemas
      });
    } catch (err) {
      console.log(err)
      const cinemas = await getCinemas(req, res)
      res.render("dashboard/employee/addRooms", {
        title: `Ajouter une salle à votre cinéma.`,
        cinemas: cinemas || []
      });
    }
  }
);

//admin dashboard  update rooms layouts routes
employeeDashboardRoutes.get(
  "/rooms/update",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    const cinemas = await getCinemas(req, res);
    const rooms = await getRooms(req, res);
    res.render("dashboard/admin/updateRooms", {
      title: `Séléctionner une salle et à modifier la salle dans votre cinéma.`,
      cinemas: cinemas,
      rooms: rooms
    });
  }
);

//admin dashboard  delete rooms layouts routes
employeeDashboardRoutes.get(
  "/rooms/delete",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  async (req, res) => {
    const cinemas = await getCinemas(req, res);
    const rooms = await getRooms(req, res);
    try {
      res.render("dashboard/admin/deleteRooms", {
        title: `Séléctionner une salle à supprimer dans votre cinéma.`,
        cinemas: cinemas,
        rooms: rooms
      });
    } catch (err) {
      console.log(err)
      res.render("dashboard/admin/deleteRooms", {
        title: `Séléctionner une salle à supprimer dans votre cinéma.`,
        cinemas: cinemas || [],
        rooms: rooms || []
      });
    }
  }
);
module.exports = employeeDashboardRoutes;
