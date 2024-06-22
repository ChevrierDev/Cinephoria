const DB = require("../config/postgres.config");

async function searchMovies(req, res) {
    try {
        const { query } = req.query;
        const result = await DB.query(
          "SELECT movie_id, title, poster FROM movies WHERE title ILIKE $1",
          [`%${query}%`]
        );
        res.json(result.rows);
      } catch (err) {
        console.error('Error during search:', err);
        res.status(500).json({ error: "Internal server error" });
      }
}

module.exports = {
    searchMovies
}
