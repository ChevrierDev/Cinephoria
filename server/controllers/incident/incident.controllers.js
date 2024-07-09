// Import the database configuration and connection setup
const DB = require("../../config/postgres.config");

// Function to get all incidents
async function getIncident(req, res) {
  try {
    const query = `
      SELECT i.*, c.name AS cinema_name, c.images as cinema_image, r.name as room_name, s.seat_label as seat_label
      FROM incident i
      JOIN rooms r ON i.room_id = r.room_id
      JOIN cinemas c ON r.cinema_id = c.cinema_id
      JOIN seats s ON i.seat_id = s.seat_id
    `;
    const results = await DB.query(query);
    // Check if any incidents are found
    if (results.rows.length <= 0) {
      return res.status(404).json({ message: "No incident found!" });
    }
    // Return the incidents if found
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error!");
  }
}
// Function to get an incident by ID
async function getIncidentById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM incident WHERE incident_id = $1";
    const results = await DB.query(query, [id]);
    // Check if the specific incident is found
    if (results.rows.length <= 0) {
      return res.status(404).json({ message: "No incident id found!" });
    }
    // Return the incident if found
    res.status(200).json(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error!");
  }
}

// Function to create a new incident
async function postIncident(req, res) {
  try {
    const { room_id, seat_id, description } = req.body;

    // Validate that required fields are provided
    if (!room_id || !seat_id || !description) {
      return res
        .status(404)
        .json({ error: "You must enter all required fields!" });
    }

    const query =
      "INSERT INTO incident (room_id, seat_id, description, report_date) VALUES ($1, $2, $3, NOW()) RETURNING *";
    const result = await DB.query(query, [room_id, seat_id, description]);

    // Return the created incident
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error!" });
  }
}

// Function to update an existing incident by ID
async function updateIncidentById(req, res) {
  try {
    const id = req.params.id;

    const { room_id, seat_id, user_id, description, report_date } = req.body;

    // Validate that required fields are provided
    if (!room_id || !seat_id || !user_id || !description || !report_date) {
      return res
        .status(400)
        .json({ error: "You must enter all required fields!" });
    }

    // Check if the incident exists
    const incidentCheckQuery = "SELECT * FROM incident WHERE incident_id = $1";
    const incidentCheckResult = await DB.query(incidentCheckQuery, [id]);

    if (incidentCheckResult.rowCount === 0) {
      return res.status(404).json({ error: "No incident found!" });
    }

    const query =
      "UPDATE incident SET room_id = $1, seat_id = $2, user_id = $3, description = $4, report_date = $5 WHERE incident_id = $6 RETURNING *";
    const result = await DB.query(query, [
      room_id,
      seat_id,
      user_id,
      description,
      report_date,
      id,
    ]);

    // Confirm the incident was updated
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

// Function to delete an incident by ID
async function deleteIncidentById(req, res) {
  try {
    const id = req.params.id;
    // Check if the incident exists before attempting to delete
    const foundIncidentQuery = "SELECT * FROM incident WHERE incident_id = $1";
    const incident = await DB.query(foundIncidentQuery, [id]);
    if (incident.rows.length !== 0) {
      const query = "DELETE FROM incident WHERE incident_id = $1";
      await DB.query(query, [id]);
      // Confirm the incident was deleted
      return res.status(200).json({ message: "Incident deleted successfully" });
    } else {
      // Incident not found
      return res.status(404).json({ error: "No incident found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error!");
  }
}

// Export the functions for use in other modules
module.exports = {
  getIncident,
  getIncidentById,
  postIncident,
  deleteIncidentById,
  updateIncidentById,
};
