const DB = require("../../config/postgres.config");
const moment = require('moment');
const momentTimezone = require('moment-timezone');



// Functions to get all showtimes
async function getShowtimes() {
  try {
    const query = "SELECT * FROM showtimes";
    const results = await DB.query(query);

    // Check if any showtimes are found
    if (results.rows.length <= 0) {
      return []; 
    }
    // Send the found showtimes as response
    return results.rows;
  } catch (err) {
    console.log(err);
    throw new Error("Internal server error"); 
  }
}


// Function to get showtimes by cinema and room
async function getShowtimesByCinemaAndRoom(req, res) {
  try {
    const { cinemaId, roomId } = req.params;
    const query = `
      SELECT s.showtimes_id, s.day, s.start_time, s.end_time, s.price, m.title 
      FROM showtimes s
      JOIN movies m ON s.movie_id = m.movie_id
      WHERE s.cinema_id = $1 AND s.room_id = $2
      ORDER BY s.day, s.start_time
    `;
    const results = await DB.query(query, [cinemaId, roomId]);

    // Check if any showtimes are found
    if (results.rows.length <= 0) {
      return res.status(404).json({ message: "No showtimes found!" });
    }

    // Send the found showtimes as response
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
  }
}

async function getShowtimesByCinemaAndFilm(cinemaId, filmId) {
  try {
    const query = `
      SELECT s.showtimes_id, s.day, s.start_time, s.end_time, s.price,
             m.movie_id, m.title, m.poster, m.description, m.genre, m.release_date,
             c.name AS cinema_name,
             c.location AS cinema_location,
             c.country AS cinema_country,
             c.images AS cinema_images,
             r.quality AS room_quality,
             r.name AS room_name
      FROM showtimes s
      JOIN movies m ON s.movie_id = m.movie_id
      JOIN cinemas c ON s.cinema_id = c.cinema_id
      JOIN rooms r ON s.room_id = r.room_id
      WHERE s.cinema_id = $1 AND m.movie_id = $2
      ORDER BY s.day ASC, s.start_time ASC;
    `;
    const result = await DB.query(query, [cinemaId, filmId]);

    const showtimesByMovie = {};

    result.rows.forEach(row => {
      if (!showtimesByMovie[row.movie_id]) {
        showtimesByMovie[row.movie_id] = {
          movie_id: row.movie_id,
          title: row.title,
          poster: row.poster,
          description: row.description,
          genre: row.genre,
          release_date: row.release_date,
          cinema_name: row.cinema_name,
          cinema_location: row.cinema_location,
          cinema_country: row.cinema_country,
          cinema_images: row.cinema_images,
          showtimes: []
        };
      }

      // Utilisation de moment.js pour vérifier et formater les dates et heures
      const day = moment(row.day);
      const startDateTime = moment(row.day).set({
        hour: parseInt(row.start_time.split(':')[0]),
        minute: parseInt(row.start_time.split(':')[1]),
        second: parseInt(row.start_time.split(':')[2])
      });
      const endDateTime = moment(row.day).set({
        hour: parseInt(row.end_time.split(':')[0]),
        minute: parseInt(row.end_time.split(':')[1]),
        second: parseInt(row.end_time.split(':')[2])
      });

      if (!day.isValid() || !startDateTime.isValid() || !endDateTime.isValid()) {
        console.error("Invalid date or time value detected", { row });
        throw new Error("Invalid date or time value");
      }

      // Formater les dates et heures pour l'affichage
      const localDay = day.format('DD/MM/YYYY');
      const localStartTime = startDateTime.format('HH:mm');
      const localEndTime = endDateTime.format('HH:mm');

      showtimesByMovie[row.movie_id].showtimes.push({
        showtimes_id: row.showtimes_id,
        day: localDay,
        start_time: localStartTime,
        end_time: localEndTime,
        price: row.price,
        quality: row.room_quality,
        room_name: row.room_name
      });
    });

    return Object.values(showtimesByMovie);
  } catch (err) {
    console.log("Internal server error", err);
    throw err;
  }
}

// Function to get showtimes by film
async function getShowtimesByFilm(filmId) {
  try {
    const query = `
      SELECT s.showtimes_id, s.day, s.start_time, s.end_time, s.price,
             m.movie_id, m.title, m.poster, m.description, m.genre, m.release_date,
             c.cinema_id, c.name AS cinema_name, c.location AS cinema_location, 
             c.country AS cinema_country, c.images AS cinema_images,
             r.quality AS room_quality, r.name AS room_name
      FROM showtimes s
      JOIN movies m ON s.movie_id = m.movie_id
      JOIN cinemas c ON s.cinema_id = c.cinema_id
      JOIN rooms r ON s.room_id = r.room_id
      WHERE m.movie_id = $1
      ORDER BY s.day DESC;
    `;
    const result = await DB.query(query, [filmId]);

    // Ajout de logs pour vérifier les données récupérées
    console.log('Showtimes récupérées:', JSON.stringify(result.rows, null, 2));

    // Organiser les séances par cinéma
    const showtimesByCinema = {};
    result.rows.forEach(row => {
      if (!showtimesByCinema[row.cinema_id]) {
        showtimesByCinema[row.cinema_id] = {
          cinema_id: row.cinema_id,
          cinema_name: row.cinema_name,
          cinema_location: row.cinema_location,
          cinema_country: row.cinema_country,
          cinema_images: row.cinema_images,
          showtimes: []
        };
      }
      showtimesByCinema[row.cinema_id].showtimes.push({
        showtimes_id: row.showtimes_id,
        day: row.day,
        start_time: row.start_time,
        end_time: row.end_time,
        price: row.price,
        quality: row.room_quality,
        room_name: row.room_name 
      });
    });

    return Object.values(showtimesByCinema);
  } catch (err) {
    console.log("Internal server error", err);
    throw err;
  }
}

// Function to get showtimes by cinema
async function getShowtimesByCinema(cinemaId) {
  try {
    console.log(`Fetching showtimes for cinemaId: ${cinemaId}`);
    const query = `
      SELECT s.showtimes_id, s.day, s.start_time, s.end_time, s.price, 
             m.movie_id, m.title, m.poster, m.description, m.genre, m.release_date,
             c.name AS cinema_name,
             c.location AS cinema_location,
             c.country AS cinema_country,
             c.images AS cinema_images,
             r.quality AS room_quality
      FROM showtimes s
      JOIN movies m ON s.movie_id = m.movie_id
      JOIN cinemas c ON s.cinema_id = c.cinema_id
      JOIN rooms r ON s.room_id = r.room_id
      WHERE s.cinema_id = $1
      ORDER BY s.day DESC;
    `;
    const result = await DB.query(query, [cinemaId]);
    
    // Regroup showtimes by movie
    const showtimesByMovie = {};
    result.rows.forEach(row => {
      if (!showtimesByMovie[row.movie_id]) {
        showtimesByMovie[row.movie_id] = {
          movie_id: row.movie_id,
          title: row.title,
          poster: row.poster,
          description: row.description,
          genre: row.genre,
          release_date: row.release_date,
          cinema_name: row.cinema_name,
          cinema_location: row.cinema_location,
          cinema_country: row.cinema_country,
          cinema_images: row.cinema_images,
          showtimes: []
        };
      }
      showtimesByMovie[row.movie_id].showtimes.push({
        showtimes_id: row.showtimes_id,
        day: row.day,
        start_time: row.start_time,
        end_time: row.end_time,
        price: row.price,
        quality: row.room_quality // Add room quality here
      });
    });

    return Object.values(showtimesByMovie);
  } catch (err) {
    console.log("Internal server error", err);
    throw err;
  }
}

// Function to get a showtime by ID
async function getShowtimesById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM showtimes WHERE showtimes_id = $1";
    const results = await DB.query(query, [id]);
    // Check if the showtimes with the given ID is found
    if (results.rows.length <= 0) {
      res.status(404).json({ message: "No showtimes id found !" });
      return [];
    }
    // Send the found showtimes as response
    return results.rows[0];
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

// Function to get a showtime by ID with all related information
async function getJoinInfoShowtimesById(req, res) {
  try {
    const id = req.params.id;
    const query = `
      SELECT s.showtimes_id, s.day, s.start_time, s.end_time, s.price,
             m.title AS movie_title, m.poster AS movie_poster, m.duration AS movie_duration, m.banner AS movie_banner, m.video AS movie_trailer, m.description AS movie_description,m.movie_id AS movie_id, m.genre AS movie_genre, m.release_date AS movie_release_date,
             c.name AS cinema_name,c.cinema_id AS cinema_id, c.location AS cinema_location, c.country AS cinema_country, c.images AS cinema_images,
             r.name AS room_name,r.room_id AS room_id, r.quality AS room_quality
      FROM showtimes s
      JOIN movies m ON s.movie_id = m.movie_id
      JOIN cinemas c ON s.cinema_id = c.cinema_id
      JOIN rooms r ON s.room_id = r.room_id
      WHERE s.showtimes_id = $1
    `;
    const results = await DB.query(query, [id]);

    // Check if the showtimes with the given ID is found
    if (results.rows.length <= 0) {
      res.status(404).json({ message: "No showtimes found with the given ID!" });
      return null;
    }

    // Send the found showtime as response
    return results.rows[0];
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error!");
  }
}

// Function to create new showtimes
async function postShowtimes(req, res) {
  try {
    const { movie_id, cinema_id, room_id, price, showtimes } = req.body;

    // Validate the request body fields
    if (
      !movie_id ||
      !cinema_id ||
      !room_id ||
      !price ||
      !Array.isArray(showtimes) ||
      showtimes.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "You must enter all required fields!" });
    }

    // Validate showtimes to prevent overlapping
    const queryCheck = `
      SELECT * FROM showtimes 
      WHERE cinema_id = $1 AND room_id = $2 AND day = $3
      AND (
        (start_time < $4 AND end_time > $4) OR
        (start_time < $5 AND end_time > $5) OR
        (start_time >= $4 AND end_time <= $5)
      )
    `;

    for (const showtime of showtimes) {
      const { day, start_time, end_time } = showtime;

      const result = await DB.query(queryCheck, [
        cinema_id,
        room_id,
        day,
        start_time,
        end_time,
      ]);

      if (result.rows.length > 0) {
        return res.status(400).json({
          error: `Time overlap detected for showtime on ${day} from ${start_time} to ${end_time}`,
        });
      }
    }

    // Insert showtimes
    const queryInsert = `
      INSERT INTO showtimes (movie_id, cinema_id, room_id, day, start_time, end_time, price)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;

    const insertedShowtimes = [];
    for (const showtime of showtimes) {
      const { day, start_time, end_time } = showtime;

      const result = await DB.query(queryInsert, [
        movie_id,
        cinema_id,
        room_id,
        day,
        start_time,
        end_time,
        price,
      ]);

      insertedShowtimes.push(result.rows[0]);
    }

    // Send the newly created showtimes as response
    res.status(201).json(insertedShowtimes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
  }
}

// Function to update showtimes by ID
async function updateShowtimesById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { movie_id, cinema_id, room_id, price, showtimes } = req.body;

    // Vérifiez que tous les champs sont présents
    if (
      !movie_id ||
      !cinema_id ||
      !room_id ||
      !price ||
      !Array.isArray(showtimes) ||
      showtimes.length === 0
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    for (const showtime of showtimes) {
      const { day, start_time, end_time } = showtime;

      // Vérifiez que les champs showtime sont présents
      if (!day || !start_time || !end_time) {
        return res.status(400).json({
          error: "Day, start time, and end time are required for each showtime",
        });
      }

      // Log parameters to check their values
      console.log(
        "Parameters for conflict check:",
        cinema_id,
        room_id,
        day,
        start_time,
        end_time,
        id
      );

      const queryCheck = `
        SELECT * FROM showtimes 
        WHERE cinema_id = $1 AND room_id = $2 AND day = $3 AND showtimes_id != $6
        AND (
          (start_time < $4 AND end_time > $4) OR
          (start_time < $5 AND end_time > $5) OR
          (start_time >= $4 AND end_time <= $5)
        )
      `;

      const result = await DB.query(queryCheck, [
        parseInt(cinema_id),
        parseInt(room_id),
        day,
        start_time,
        end_time,
        id,
      ]);

      if (result.rows.length > 0) {
        return res.status(400).json({
          error: `Time overlap detected for showtime on ${day} from ${start_time} to ${end_time}`,
        });
      }

      console.log(
        "Parameters for update:",
        movie_id,
        cinema_id,
        room_id,
        day,
        start_time,
        end_time,
        price,
        id
      );

      const queryUpdate = `
        UPDATE showtimes 
        SET movie_id = $1, cinema_id = $2, room_id = $3, day = $4, start_time = $5, end_time = $6, price = $7 
        WHERE showtimes_id = $8 RETURNING *
      `;

      const updateResult = await DB.query(queryUpdate, [
        parseInt(movie_id),
        parseInt(cinema_id),
        parseInt(room_id),
        day,
        start_time,
        end_time,
        parseFloat(price),
        id,
      ]);

      if (updateResult.rows.length === 0) {
        return res.status(404).json({ error: "Showtime not found" });
      }
    }

    return res.status(200).json({ message: "Showtimes updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

// get movies associated to showtimes
async function getShowtimesWithMovies(req, res) {
  try {
    const query = `
      SELECT s.showtimes_id, s.day, s.start_time, s.end_time, s.price, 
             m.title, m.poster, m.description, m.genre, m.release_date,
             c.name AS cinema_name, 
             c.location AS cinema_location, 
             c.country AS cinema_country,
             c.images AS cinema_images
      FROM showtimes s
      JOIN movies m ON s.movie_id = m.movie_id
      JOIN cinemas c ON s.cinema_id = c.cinema_id
      ORDER BY s.day DESC;
    `;
    const result = await DB.query(query);
    const showtimesWithMovies = result.rows;
    return showtimesWithMovies;
  } catch (err) {
    console.log("Internal server error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Function to delete a showtimes by ID
async function deleteShowtimesById(req, res) {
  try {
    const id = req.params.id;
    const foundShowtimesQuery =
      "SELECT * FROM showtimes WHERE showtimes_id = $1";
    const showtimes = await DB.query(foundShowtimesQuery, [id]);
    // Check if the showtimes with the given ID is found
    if (showtimes.rows.length !== 0) {
      const query = "DELETE FROM showtimes WHERE showtimes_id = $1";
      await DB.query(query, [id]);
      // Send a success message as response
      return res
        .status(200)
        .json({ message: "Showtimes deleted successfully" });
    } else {
      return res.status(404).json({ message: "No showtimes found !" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

// Export the functions as a module
module.exports = {
  getShowtimes,
  getShowtimesByCinema,
  getShowtimesByCinemaAndFilm,
  getShowtimesByFilm,
  getShowtimesWithMovies,
  getShowtimesById,
  getJoinInfoShowtimesById,
  postShowtimes,
  deleteShowtimesById,
  updateShowtimesById,
  getShowtimesByCinemaAndRoom,
};
