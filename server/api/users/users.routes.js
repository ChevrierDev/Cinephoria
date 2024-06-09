const express = require('express');
const usersRoutes = express.Router();
const { getUsers, getUserById, deleteUserById, postUser, updateUserById } = require('../../controllers/users/users.controllers');
const { postUserValidator, validateUser, updateUserValidator } = require('../../middlewares/validator/users.validator');

//get all users
usersRoutes.get('/users', getUsers);
//get user
usersRoutes.get('/users/:id', getUserById);
//post user
usersRoutes.post('/users', postUserValidator(), validateUser, postUser);
//update user
usersRoutes.put('/users/:id', updateUserValidator(), validateUser, updateUserById);
//delete user
usersRoutes.delete('/users/:id', deleteUserById);

module.exports = usersRoutes