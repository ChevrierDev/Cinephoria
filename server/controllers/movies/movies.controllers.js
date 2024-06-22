const DB = require("../../config/postgres.config");
const { validationResult } = require('express-validator');
const fs = require("fs");

async function getMovies(req, res) {
  try {
    const query = "SELECT * FROM movies";
    const results = await DB.query(query);
    if (results.rows.length <= 0) {
      res.status(404).json("No movies found !");
      return;
    }
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

async function getMovieById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM movies WHERE movie_id = $1";
    const result = await DB.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No movie found with the given ID" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching movie by ID:', err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function postMovie(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.files) {
      Object.values(req.files).forEach(fileArray => {
        fileArray.forEach(file => {
          fs.unlinkSync(file.path);
        });
      });
    }
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      title,
      duration,
      genre,
      pg,
      favorite,
      description,
      casting,
      release_date,
    } = req.body;

    const banner = req.files["banner"] ? req.files["banner"][0].filename : null;
    const poster = req.files["poster"] ? req.files["poster"][0].filename : null;
    const video = req.files["video"] ? req.files["video"][0].filename : null;

    if (
      !title ||
      !duration ||
      !genre ||
      !pg ||
      !banner ||
      !poster ||
      !video ||
      !description ||
      !casting ||
      !release_date
    ) {
      if (req.files) {
        Object.values(req.files).forEach(fileArray => {
          fileArray.forEach(file => {
            fs.unlinkSync(file.path);
          });
        });
      }
      return res
        .status(400)
        .json({ error: "You must enter all required fields!" });
    }

    const query =
      "INSERT INTO movies (title, duration, genre, pg, banner, poster, video, favorite, description, casting, release_date) VALUES ($1, $2, $3, $4, $5, $6, $7, 'false', $8, $9, $10) RETURNING *";
    const result = await DB.query(query, [
      title,
      duration,
      genre,
      pg,
      banner,
      poster,
      video,
      description,
      casting,
      release_date,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (req.files) {
      Object.values(req.files).forEach(fileArray => {
        fileArray.forEach(file => {
          fs.unlinkSync(file.path);
        });
      });
    }
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
  }
}

async function updateMovieById(req, res) {
  try {
    const id = req.params.id;
    const {
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

    const query =
      "UPDATE movies SET title = $1, duration = $2, genre = $3, pg = $4, banner = $5, poster = $6, video = $7, favorite = $8, description = $9, casting = $10, release_date = $11  WHERE movie_id = $12";
    const result = await DB.query(query, [
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
      id,
    ]);
    return res.status(200).json({ message: "Movie updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error!" });
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
      return res.status(200).json("Movie deleted successfully");
    } else {
      return res.status(404).json("No movie found !");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  deleteMovieById,
  updateMovieById,
};
