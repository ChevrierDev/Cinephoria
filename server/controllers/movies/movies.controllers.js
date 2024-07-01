const DB = require("../../config/postgres.config");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

async function getMovies(req, res) {
  try {
    const query = "SELECT * FROM movies";
    const results = await DB.query(query);
    if (results.rows.length <= 0) {
      res.status(404).json("No movies found !");
      return;
    }
    return results.rows;
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

// Get all recent wednesday movies
async function getLastWedMovies(req, res) {
  try {
    const query = `
      WITH last_wednesday AS (
        SELECT date_trunc('day', current_date) - ((date_part('dow', current_date)::int + 4) % 7) * interval '1 day' AS last_wed
      )
      SELECT *
      FROM movies
      WHERE DATE(added_date) >= (SELECT last_wed FROM last_wednesday) - interval '7 days'
      ORDER BY added_date DESC;
    `;
    const result = await DB.query(query);
    const movies = result.rows;
    return movies;
  } catch (err) {
    throw err
  }
}

async function getMovieById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM movies WHERE movie_id = $1";
    const result = await DB.query(query, [id]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No movie found with the given ID" });
    }
    return result.rows[0];
  } catch (err) {
    console.error("Error fetching movie by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function postMovie(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.files) {
      Object.values(req.files).forEach((fileArray) => {
        fileArray.forEach((file) => {
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
        Object.values(req.files).forEach((fileArray) => {
          fileArray.forEach((file) => {
            fs.unlinkSync(file.path);
          });
        });
      }
      return res
        .status(400)
        .json({ error: "You must enter all required fields!" });
    }

    const query = `
      INSERT INTO movies (title, duration, genre, pg, banner, poster, video, favorite, description, casting, release_date, added_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'false', $8, $9, $10, NOW()) RETURNING *`;
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
      Object.values(req.files).forEach((fileArray) => {
        fileArray.forEach((file) => {
          fs.unlinkSync(file.path);
        });
      });
    }
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
  }
}


async function updateMovieById(req, res) {
  console.log("Received request body:", req.body);
  console.log("Received files:", req.files);

  try {
    const id = req.params.id;
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

    const currentMovieQuery = "SELECT * FROM movies WHERE movie_id = $1";
    const currentMovieResult = await DB.query(currentMovieQuery, [id]);
    const currentMovie = currentMovieResult.rows[0];

    if (!currentMovie) {
      return res.status(404).json({ error: "Movie not found!" });
    }

    const banner = req.files["banner"]
      ? req.files["banner"][0].filename
      : currentMovie.banner;
    const poster = req.files["poster"]
      ? req.files["poster"][0].filename
      : currentMovie.poster;
    const video = req.files["video"]
      ? req.files["video"][0].filename
      : currentMovie.video;

    const uploadsDir = path.join(__dirname, "..", "..", "uploads");

    if (req.files["banner"] && currentMovie.banner) {
      fs.unlinkSync(path.join(uploadsDir, currentMovie.banner));
    }
    if (req.files["poster"] && currentMovie.poster) {
      fs.unlinkSync(path.join(uploadsDir, currentMovie.poster));
    }
    if (req.files["video"] && currentMovie.video) {
      fs.unlinkSync(path.join(uploadsDir, currentMovie.video));
    }

    const updatedMovie = {
      title: title || currentMovie.title,
      duration: duration || currentMovie.duration,
      genre: genre || currentMovie.genre,
      pg: pg || currentMovie.pg,
      banner: banner,
      poster: poster,
      video: video,
      favorite: favorite || currentMovie.favorite,
      description: description || currentMovie.description,
      casting: casting || currentMovie.casting,
      release_date: release_date || currentMovie.release_date,
    };

    const query =
      "UPDATE movies SET title = $1, duration = $2, genre = $3, pg = $4, banner = $5, poster = $6, video = $7, favorite = $8, description = $9, casting = $10, release_date = $11 WHERE movie_id = $12";
    const result = await DB.query(query, [
      updatedMovie.title,
      updatedMovie.duration,
      updatedMovie.genre,
      updatedMovie.pg,
      updatedMovie.banner,
      updatedMovie.poster,
      updatedMovie.video,
      updatedMovie.favorite,
      updatedMovie.description,
      updatedMovie.casting,
      updatedMovie.release_date,
      id,
    ]);

    return res
      .status(200)
      .json({ success: true, message: "Movie updated successfully." });
  } catch (err) {
    if (req.files) {
      Object.values(req.files).forEach((fileArray) => {
        fileArray.forEach((file) => {
          fs.unlinkSync(file.path);
        });
      });
    }
    console.log(err);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

async function deleteMovieById(req, res) {
  try {
    const id = req.params.id;
    const foundMovieQuery = "SELECT * FROM movies WHERE movie_id = $1";
    const movie = await DB.query(foundMovieQuery, [id]);

    if (movie.rows.length === 0) {
      return res.status(404).json("No movie found !");
    }

    const currentMovie = movie.rows[0];
    const uploadsDir = path.join(__dirname, "..", "..", "uploads");

    if (currentMovie.banner) {
      const bannerPath = path.join(uploadsDir, currentMovie.banner);
      if (fs.existsSync(bannerPath)) {
        fs.unlinkSync(bannerPath);
      }
    }

    if (currentMovie.poster) {
      const posterPath = path.join(uploadsDir, currentMovie.poster);
      if (fs.existsSync(posterPath)) {
        fs.unlinkSync(posterPath);
      }
    }

    if (currentMovie.video) {
      const videoPath = path.join(uploadsDir, currentMovie.video);
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
      }
    }

    const deleteMovieQuery = "DELETE FROM movies WHERE movie_id = $1";
    await DB.query(deleteMovieQuery, [id]);

    return res.status(200).json({ success: true, message: "Movie deleted successfully" });
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
  getLastWedMovies
};
