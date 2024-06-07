const { Pool } = require('pg');
require("dotenv").config({ path: '../../.env.development.local' });

console.log(process.argv)
 
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

// Test the connection
pool.connect( async (err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    const query = 'SELECT * FROM users';
    const res = await pool.query(query);
    console.log(res.rows)
    console.log('Connected to the database');
    release();
});

//secure connection shutDown
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
  