// Import the database configuration
const DB = require("../../config/postgres.config");

// Functions to get all Rooms
async function getRooms(req, res) {
  try {
    const query = "SELECT * FROM rooms";
    const results = await DB.query(query);

     // Check if any rooms are found
    if (results.rows.length <= 0) {
      res.status(404).json("No rooms found !");
      return;
    }
    // Send the found rooms as response
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

// Function to get a room by ID
async function getRoomsById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM rooms WHERE room_id = $1";
    const results = await DB.query(query, [id]);
    // Check if the room with the given ID is found
    if (results.rows.length <= 0) {
      res.status(404).json("No room id found !");
      return;
    }
    // Send the found room as response
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

// Function to create a new room
async function postRooms(req, res) {
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
      "INSERT INTO rooms (cinema_id, name, quality) VALUES ($1, $2, $3) RETURNING *";
    const result = await DB.query(query, [
      cinema_id,
      name,
      quality,
    ]);

    // Send the newly created room as response
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
  }
}

// Function to update a room by ID
async function updateRoomsById(req, res) {
  try {
    const id = req.params.id;
    const {
      cinema_id,
      name,
      quality,
    } = req.body;

    const query =
      "UPDATE rooms SET cinema_id = $1, name = $2, quality = $3 WHERE room_id = $4";
    const result = await DB.query(query, [
      cinema_id,
      name,
      quality,
      id,
    ]);
    // Send a success message as response
    return res.status(200).json({ message: "Rooms updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

// Function to delete a room by ID
async function deleteRoomsById(req, res) {
  try {
    const id = req.params.id;
    const foundRoomsQuery = "SELECT * FROM rooms WHERE room_id = $1";
    const room = await DB.query(foundRoomsQuery, [id]);
     // Check if the room with the given ID is found
    if (room.rows.length !== 0) {
      const query = "DELETE FROM rooms WHERE room_id = $1";
      await DB.query(query, [id]);
      // Send a success message as response
      return res.status(200).json("Room deleted successfully");
    } else {
      return res.status(404).json("No room found !");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error !");
  }
}

// Export the functions as a module
module.exports = {
  getRooms,
  getRoomsById,
  postRooms,
  deleteRoomsById,
  updateRoomsById,
};