const db = require("../../config/postgres.config");
const Reservation = require("../../models/reservationStats.mongo");
require('dotenv', {path: '../../../.env'})

async function transferReservationsToMongo() {
    const query = `
      SELECT 
        s.movie_id, 
        COUNT(r.*) as count, 
        DATE(r.reserved_at) as date 
      FROM reservations r
      JOIN showtimes s ON r.showtimes_id = s.showtimes_id
      WHERE r.reserved_at >= NOW() - INTERVAL '7 days'
      GROUP BY s.movie_id, DATE(r.reserved_at)
    `;
    try {
      const { rows } = await db.query(query);
      console.log('Rows fetched from PostgreSQL:', rows);
  
      const reservations = rows.map(row => ({
        movieId: row.movie_id,
        count: row.count,
        date: new Date(row.date),
      }));
  
      console.log('Mapped reservations:', reservations);
      
      for (const reservation of reservations) {
        await Reservation.findOneAndUpdate(
          { movieId: reservation.movieId, date: reservation.date },
          { $set: { count: reservation.count } },
          { upsert: true, new: true }
        );
      }
  
      console.log('Data transferred to MongoDB');
    } catch (err) {
      console.error('Error transferring data to MongoDB:', err);
    }
  }

module.exports = transferReservationsToMongo;
