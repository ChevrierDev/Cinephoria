const DB = require("../../config/postgres.config");

async function assignPost(req, res) {
  const { cinema, firstName, lastName } = req.body;

  try {
    const cinemaResult = await DB.query(
      "SELECT cinema_id FROM cinemas WHERE name = $1",
      [cinema]
    );
    if (cinemaResult.rows.length === 0) {
      return res.status(404).json({ error: "Cinema not found" });
    }
    const cinemaId = cinemaResult.rows[0].cinema_id;

    const employeeResult = await DB.query(
      "SELECT user_id FROM users WHERE first_name ILIKE $1 AND last_name ILIKE $2 AND role = 'employee'",
      [firstName, lastName]
    );
    if (employeeResult.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const employeeId = employeeResult.rows[0].user_id;

    await DB.query(
      "INSERT INTO cinema_employees (cinema_id, user_id) VALUES ($1, $2)",
      [cinemaId, employeeId]
    );

    res.status(200).json({ message: "Employee assigned to cinema successfully" });
  } catch (err) {
    console.error("Error assigning employee to cinema:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { assignPost };
