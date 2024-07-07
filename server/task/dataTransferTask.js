const cron = require('node-cron');
const transferReservationsToMongo = require('../controllers/data/dataTransfer.controllers');

cron.schedule('0 0 * * *', () => {
  console.log('Running data transfer task');
  transferReservationsToMongo();
});
