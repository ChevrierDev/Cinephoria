const DB = require("../../config/postgres.config");

async function getCinemas(req, res) {
  try {
    const query = "SELECT * FROM cinemas";
    const results = await DB.query(query);
    if (results.rows.length <= 0) {
      res.status(400).json({ message: "No cinemas found !" });
      return;
    }
    return res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
  }
}

async function getCinemaById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM cinemas WHERE cinema_id = $1";
    const result = await DB.query(query, [id]);
    if (result.rows.length <= 0) {
      res.status(400).json({ message: "No cinema found !" });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
  }
}

async function postCinema(req, res) {
  try {
    const { name, location, country, images } = req.body;

    if (!name || !location || !country || !images) {
      return res.status(400).json({ error: "You must enter all fields!" });
    }
    const query =
      "INSERT INTO cinemas (name, location, country, images) VALUES ($1, $2, $3, $4) RETURNING *";
    const result = await DB.query(query, [name, location, country, images]);

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

async function updateCinemaById(req, res) {
  try {
    const id = req.params.id;
    const { name, location, country, images } = req.body;

    const verificationQuery = "SELECT * FROM cinemas WHERE cinema_id = $1";
    const data = await DB.query(verificationQuery, [id]);

    if (data.rows.length === 0) {
      return res.status(400).json({ message: "Cinema not found" });
    }

    const cinema = data.rows[0];

    const isSameName = name === cinema.name;
    const isSameLocation = location === cinema.location;
    const isSameCountry = country === cinema.country;
    const isSameImages = images === cinema.images;

    if (isSameName && isSameLocation && isSameCountry && isSameImages) {
      return res
        .status(404)
        .json({ message: "You must update with different data." });
    }

    const query =
      "UPDATE cinemas SET name = $1, location = $2, country = $3, images = $4 WHERE cinema_id = $5 RETURNING *";
    const result = await DB.query(query, [name, location, country, images, id]);

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

async function deleteCinemaById(req, res) {
  try {
    const id = req.params.id;

    const foundCinemaQuery = "SELECT * FROM cinemas WHERE cinema_id = $1";
    const cinema = await DB.query(foundCinemaQuery, [id]);

    if (cinema.rows.length !== 0) {
      const query = "DELETE FROM cinemas WHERE cinema_id = $1";
      await DB.query(query, [id]);
      res.status(200).json({ message: "Cinema deleted successfully!" });
    } else {
      return res
        .status(404)
        .json({ error: "No cinema found with this provided ID!" });
    }
  } catch (err) {
    console.log("Error during deletion:", err);
    res.status(500).json({ error: "Internal server error!" });
  }
}

module.exports = {
  getCinemas,
  getCinemaById,
  postCinema,
  updateCinemaById,
  deleteCinemaById,
};
