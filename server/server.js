require('dotenv').config({path: '../.env'});
const http = require("http");
const app = require("../server/app.js");
const mongoose = require('mongoose');
const connectDB = require('./config/mongodb.config.js');
const PORT = 3030;
require('./task/dataTransferTask.js');

const server = http.createServer(app);

//connexion to MongoDB
connectDB()

server.listen(PORT, () => {
  console.log(`Vous êtes connecté au port ${PORT}`);
});
