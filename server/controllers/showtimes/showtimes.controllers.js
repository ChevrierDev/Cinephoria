const DB = require("../../config/postgres.config");

// Functions to get all showtimes
async function getShowtimes(req, res) {
  try {
    const query = "SELECT * FROM showtimes";
    const results = await DB.query(query);

    // Check if any showtimes are found
    if (results.rows.length <= 0) {
      res.status(404).json({ message: "No showtimes found !" });
      return;
    }
    // Send the found showtimes as response
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
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
      return;
    }
    // Send the found showtimes as response
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
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
        return res
          .status(400)
          .json({
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

// Function to update a showtimes by ID
async function updateShowtimesById(req, res) {
  try {
    const id = req.params.id;
    const { movie_id, cinema_id, room_id, day, start_time, end_time, price } =
      req.body;

    const query =
      "UPDATE showtimes SET movie_id = $1, cinema_id = $2, room_id = $3, day = $4, start_time = $5, end_time = $6, price = $7 WHERE showtimes_id = $8";
    const result = await DB.query(query, [
      movie_id,
      cinema_id,
      room_id,
      day,
      start_time,
      end_time,
      price,
      id,
    ]);
    // Send a success message as response
    return res.status(200).json({ message: "Showtimes updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error!" });
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
  getShowtimesById,
  postShowtimes,
  deleteShowtimesById,
  updateShowtimesById,
};
