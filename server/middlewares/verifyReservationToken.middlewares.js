const DB = require('../config/postgres.config')

async function verifyTokenMiddleware(req, res, next) {
  const { reservationId } = req.params;
  const { token } = req.query;

  try {
    const query = `
      SELECT token
      FROM reservations
      WHERE reservation_id = $1 AND token = $2
    `;
    const result = await DB.query(query, [reservationId, token]);
    if (result.rows.length === 0) {
      return res.status(401).send('Invalid or expired token');
    }
    if (token === result.rows[0]) {
        return res.status(401).send('You have no access to this routes');
    }
    next();
  } catch (err) {
    console.error('Error verifying token from DB:', err);
    return res.status(500).send('Internal server error');
  }
}

module.exports = { verifyTokenMiddleware };
