// Import the database configuration
const DB = require("../../config/postgres.config");


async function getReservation(req, res) {
  try {
    const query = "SELECT * FROM reservations";
    const results = await DB.query(query);
    // Check if any reservations are found
    if (results.rows.length <= 0) {
      // Send the found reservations as response
      res.status(404).json({message:"No reservation found !"});
      return;
    }
    // Send the found reservation as response
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

async function getReservationById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM reservations WHERE reservation_id = $1";
    const results = await DB.query(query, [id]);
    // Check if the reservation with the given ID is found
    if (results.rows.length <= 0) {
      res.status(404).json({message:"No reservation id found !"});
      return;
    }
    // Send the found reservation as response
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

// Function to create a new reservation
// Note: Bug to fix (unable to post)
async function postReservation(req, res) {
  try {
    const {
      user_id,
      cinema_id,
      showtimes_id,
      seats_reserved,
      status
    } = req.body;

    // Validate the request body fields
    if (
      !user_id ||
      !cinema_id ||
      !showtimes_id ||
      !seats_reserved ||
      typeof status !== "boolean"
    ) {
      return res
        .status(400)
        .json({ error: "You must enter all required fields!" });
    }

    const query =
      "INSERT INTO reservations (user_id, cinema_id, showtimes_id, seats_reserved, status) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result = await DB.query(query, [
      user_id,
      cinema_id,
      showtimes_id,
      seats_reserved,
      status,
    ]);

    // Send the newly created reservation as response
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
  }
}

// Function to update a reservation by ID
async function updateReservationById(req, res) {
    try {
      const id = req.params.id;
      const {
        user_id,
        cinema_id,
        showtimes_id,
        seats_reserved,
        status
      } = req.body;
  
      const query =
        "UPDATE reservations SET user_id = $1, cinema_id = $2, showtimes_id = $3, seats_reserved = $4, status = $5 WHERE reservation_id = $6 RETURNING *";
      const result = await DB.query(query, [
        user_id,
        cinema_id,
        showtimes_id,
        seats_reserved,
        status,
        id,
      ]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Reservation not found" });
      }
  
      // Send a success message as response
      return res.status(200).json({ message: "Reservation updated successfully", reservation: result.rows[0] });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error!" });
    }
  }
  
// Function to delete a reservation by ID
async function deleteReservationById(req, res) {
  try {
    const id = req.params.id;
    const foundReservationQuery = "SELECT * FROM reservations WHERE reservation_id = $1";
    const reservation = await DB.query(foundReservationQuery, [id]);
    // Check if the reservation with the given ID is found
    if (reservation.rows.length !== 0) {
      const query = "DELETE FROM reservations WHERE reservation_id = $1";
      await DB.query(query, [id]);
      // Send a success message as response
      return res.status(200).json({message:"Reservation deleted successfully"});
    } else {
      return res.status(404).json({message:"No reservation found !"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

// Export the functions as a module
module.exports = {
  getReservation,
  getReservationById,
  postReservation,
  deleteReservationById,
  updateReservationById,
};