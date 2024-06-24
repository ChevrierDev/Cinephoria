const express = require("express");
const assignRouter = express.Router();
const {
    assignPost
} = require('../../controllers/assign/assign.controllers')

assignRouter.post('/assign', assignPost)





module.exports = assignRouter;
