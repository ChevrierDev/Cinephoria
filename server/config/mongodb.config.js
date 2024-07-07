const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connexion à MongoDB réussie !');
  } catch (err) {
    console.error('Connexion à MongoDB échouée !', err);
    process.exit(1);
  }
};

module.exports = connectDB;
