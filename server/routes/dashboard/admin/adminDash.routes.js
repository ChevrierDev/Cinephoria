const express = require("express");
const adminDashboardRoutes = express.Router();
const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/autorisation/autorisation");
const {
  enrichUserWithInfo,
} = require("../../../middlewares/enrichUserWithInfo");

const {
  getMovieById,
} = require("../../../controllers/movies/movies.controllers");

//admin dashboard homePage routes
adminDashboardRoutes.get(
  "/",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details;
    res.render("dashboard/admin/admin", {
      title: `Bienvenue ${user.first_name}.`,
    });
  }
);

//admin dashboard films layouts routes
adminDashboardRoutes.get(
  "/films",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/films", {
      title: `Modifier ou ajouter des films à l'affiche.`,
    });
  }
);

//admin dashboard add films layouts routes
adminDashboardRoutes.get(
  "/films/add",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/addMovie", {
      title: `Ajouter un films.`,
    });
  }
);

//admin dashboard update films layouts routes
adminDashboardRoutes.get(
  "/films/select-update",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/selectUpdateMovie", {
      title: `Séléctionner un film à modifer.`,
    });
  }
);

//admin dashboard update films layouts routes
adminDashboardRoutes.get(
  "/films/update/:id",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  async (req, res) => {
    const movie = await getMovieById(req, res);
    res.render("dashboard/admin/updateMovie", {
      title: `Modifier le film.`,
      movie : movie
    });
    
  }
);

//admin dashboard delete films layouts routes
adminDashboardRoutes.get(
  "/films/delete-selection",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/deleteMovieSelection", {
      title: `Choisir le films a Supprimer.`,
    });
  }
);

//admin dashboard rooms layouts routes
adminDashboardRoutes.get(
  "/rooms",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/rooms", {
      title: `Modifier ou ajouter des salle dans vos cinémas.`,
    });
  }
);

//admin dashboard add rooms layouts routes
adminDashboardRoutes.get(
  "/rooms/add",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/addRooms", {
      title: `Ajouter une salle à votre cinéma.`,
    });
  }
);

//admin dashboard  update rooms layouts routes
adminDashboardRoutes.get(
  "/rooms/update",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/updateRooms", {
      title: `Séléctionner une salle et à modifier la salle dans votre cinéma.`,
    });
  }
);

//admin dashboard  delete rooms layouts routes
adminDashboardRoutes.get(
  "/rooms/delete",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/deleteRooms", {
      title: `Séléctionner une salle et à supprimer dans votre cinéma.`,
    });
  }
);

//admin dashboard employee layouts routes
adminDashboardRoutes.get(
  "/employees",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/employees", {
      title: `Modifier ou ajouter des films à l'affiche.`,
    });
  }
);

//admin dashboard add employee layouts routes
adminDashboardRoutes.get(
  "/employees/add",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/addEmployees", {
      title: `Ajouter des employées entreprises.`,
    });
  }
);

//admin dashboard select update employee layouts routes
adminDashboardRoutes.get(
  "/employees/update",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/selectUpdateEmployees", {
      title: `Modifier le compte de votre employé.`,
    });
  }
);

//admin dashboard update employee layouts routes
adminDashboardRoutes.get(
  "/employees/updateEmployee",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/updateEmployees", {
      title: `Modifier le compte de votre employé.`,
    });
  }
);

//admin dashboard select delete employee layouts routes
adminDashboardRoutes.get(
  "/employees/delete",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/selectDelete", {
      title: `supprimer le compte de votre employé.`,
    });
  }
);

//admin dashboard showtimes layouts routes
adminDashboardRoutes.get(
  "/showtimes",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/showtimes", {
      title: `Modifier ou ajouter des scéances dans vos cinémas.`,
    });
  }
);

//admin dashboard showtimes select movie layouts routes
adminDashboardRoutes.get(
  "/showtimes/select-movies",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/selectMovie", {
      title: `Choisir quel films projeter.`,
    });
  }
);

//admin dashboard add showtimes  layouts routes
adminDashboardRoutes.get(
  "/showtimes/add",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/addShowtimes", {
      title: `Ajouter une scéance à projeter.`,
    });
  }
);

//admin dashboard update showtimes  layouts routes
adminDashboardRoutes.get(
  "/showtimes/update",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/updateShowtimes", {
      title: `Supprimer une scéance.`,
    });
  }
);

//admin dashboard update showtimes  layouts routes
adminDashboardRoutes.get(
  "/showtimes/delete",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    res.render("dashboard/admin/deleteShowtimes", {
      title: `Supprimer une scéance.`,
    });
  }
);

module.exports = adminDashboardRoutes;
