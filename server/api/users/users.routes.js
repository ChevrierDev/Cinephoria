const express = require("express");
const usersRoutes = express.Router();
const DB = require('../../config/postgres.config')
const {
  getUsers,
  getUserById,
  deleteUserById,
  postUser,
  updateUserById,
  postEmployee,
} = require("../../controllers/users/users.controllers");
const {
  postUserValidator,
  validateUser,
  updateUserValidator,
} = require("../../middlewares/validator/users.validator");

//get all users
usersRoutes.get("/users", getUsers);

usersRoutes.post("/getEmployeesByCinema", async (req, res) => {
  try {
    const { cinema } = req.body;
    console.log("Cinema received:", cinema);
    const query = `
      SELECT u.first_name, u.last_name FROM users u
      INNER JOIN cinema_employees ce ON u.user_id = ce.user_id
      INNER JOIN cinemas c ON ce.cinema_id = c.cinema_id
      WHERE c.name = $1 AND u.role = 'employee'
    `;
    const employees = await DB.query(query, [cinema]);
    console.log("Employees found:", employees.rows); 
    res.json({ employees: employees.rows });
  } catch (error) {
    console.error("Error fetching employees by cinema:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



//get user
usersRoutes.get("/users/:id", getUserById);
//post user
usersRoutes.post("/users", postUserValidator(), validateUser, postUser);
//post employee
usersRoutes.post("/employee", postUserValidator(), validateUser, postEmployee);
//update user
usersRoutes.put(
  "/users/:id",
  postUserValidator(),
  validateUser,
  updateUserById
);
//delete user
usersRoutes.delete("/users/:id", deleteUserById);

module.exports = usersRoutes;
