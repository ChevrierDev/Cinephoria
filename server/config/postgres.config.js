const { Pool } = require('pg');
require('dotenv').config({ path: '../../.env' });

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASSWORD), 
    port: Number(process.env.DB_PORT),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Test de la connexion
pool.connect(async (err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to the database');
    release();
});

// Fermeture sécurisée de la connexion
const shutdown = () => {
    pool.end(() => {
        console.log('Pool has ended');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

module.exports = {
    query: (text, params) => pool.query(text, params),
};
