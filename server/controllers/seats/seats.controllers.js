// Import the database configuration
const DB = require("../../config/postgres.config");

// Functions to get all seats
async function getSeats(req, res) {
  try {
    const query = "SELECT * FROM seats";
    const results = await DB.query(query);

     // Check if any seats are found
    if (results.rows.length <= 0) {
      res.status(404).json("No seats found !");
      return;
    }
    // Send the found seats as response
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

// Function to get a seat by ID
async function getSeatsById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM seats WHERE seat_id = $1";
    const results = await DB.query(query, [id]);
    // Check if the seat with the given ID is found
    if (results.rows.length <= 0) {
      res.status(404).json("No seat id found !");
      return;
    }
    // Send the found seat as response
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

// Function to create a new seat
async function postSeats(req, res) {
  try {
    const {
      cinema_id,
      name,
      quality,
    } = req.body;

    // Validate the request body fields
    if (
      !cinema_id ||
      !name ||
      !quality
    ) {
      return res
        .status(400)
        .json({ error: "You must enter all required fields!" });
    }

    const query =
      "INSERT INTO seats (cinema_id, name, quality) VALUES ($1, $2, $3) RETURNING *";
    const result = await DB.query(query, [
      cinema_id,
      name,
      quality,
    ]);

    // Send the newly created seat as response
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
  }
}


// Function to update a seat by ID
async function updateSeatsById(req, res) {
  try {
    const id = req.params.id;
    const {
      cinema_id,
      name,
      quality,
    } = req.body;

    const query =
      "UPDATE seats SET cinema_id = $1, name = $2, quality = $3 WHERE seat_id = $4";
    const result = await DB.query(query, [
      cinema_id,
      name,
      quality,
      id,
    ]);
    // Send a success message as response
    return res.status(200).json({ message: "Seat updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

// Function to delete a seat by ID
async function deleteSeatsById(req, res) {
  try {
    const id = req.params.id;
    const foundSeatsQuery = "SELECT * FROM seats WHERE seat_id = $1";
    const seat = await DB.query(foundSeatsQuery, [id]);
     // Check if the seat with the given ID is found
    if (seat.rows.length !== 0) {
      const query = "DELETE FROM seats WHERE seat_id = $1";
      await DB.query(query, [id]);
      // Send a success message as response
      return res.status(200).json("seat deleted successfully");
    } else {
      return res.status(404).json("No seat found !");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

// Export the functions as a module
module.exports = {
    getSeats,
    getSeatsById,
    postSeats,
    deleteSeatsById,
    updateSeatsById,
};