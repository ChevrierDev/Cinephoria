const DB = require("../../config/postgres.config");

async function getMovies(req, res) {
  try {
    const query = "SELECT * FROM movies";
    const results = await DB.query(query);
    if (results.rows.length <= 0) {
      res.status(404).json({message:"No movies found !"});
      return;
    }
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

async function getMovieById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM movies WHERE movie_id = $1";
    const results = await DB.query(query, [id]);
    if (results.rows.length <= 0) {
      res.status(404).json({message:"No movie id found !"});
      return;
    }
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

async function deleteMovieById(req, res) {
  try {
    const id = req.params.id;
    const foundMovieQuery = "SELECT * FROM movies WHERE movie_id = $1";
    const movie = await DB.query(foundMovieQuery, [id]);
    if (movie.rows.length !== 0) {
      const query = "DELETE FROM movies WHERE movie_id = $1";
      await DB.query(query, [id]);
      return res.status(200).send("Movie deleted successfully");
    } else {
      return res.status(404).send("No movie found !");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

async function postMovie(req, res) {
  try {
    const {
      movie_id,
      title,
      duration,
      genre,
      pg,
      banner,
      poster,
      video,
      favorite,
      description,
      casting,
      release_date,
    } = req.body;
    if (
      !movie_id ||
      !title ||
      !duration ||
      !genre ||
      !pg ||
      !banner ||
      !poster ||
      !video ||
      !favorite ||
      !description ||
      !casting ||
      !release_date
    ) {
      return res.status(400).send("All fields are required !");
    }

    const query =
      "INSERT INTO movies (movie_id, title, duration, genre, pg, banner, poster, video, favorite, description, casting, release_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *";
    const result = await DB.query(query, [
      movie_id,
      title,
      duration,
      genre,
      pg,
      banner,
      poster,
      video,
      favorite,
      description,
      casting,
      release_date,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal server error");
  }
}

module.exports = { getMovies, getMovieById, deleteMovieById, postMovie };
