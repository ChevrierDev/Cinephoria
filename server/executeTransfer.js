require('dotenv').config({path: "../.env"})
const transferReservationsToMongo = require('./controllers/data/dataTransfer.controllers');
const connectDB = require('./config/mongodb.config');


connectDB().then(() => {
  transferReservationsToMongo().then(() => {
    console.log('Data transfer complete');
    process.exit();
  }).catch(err => {
    console.error('Data transfer failed:', err);
    process.exit(1);
  });
});
