const DB = require("./postgres.config");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: "../../.env" });

async function addCinema(name, location, country, imageFiles) {
  try {
    const imageNames = [];

    for (let file of imageFiles) {
      const uniqueId = uuidv4();
      const ext = path.extname(file.originalname);
      const filename = `${uniqueId}${ext}`;
      const filePath = path.join(__dirname, "..", "uploads", filename);
      fs.writeFileSync(filePath, file.buffer);
      imageNames.push(filename);
    }

    const query = `INSERT INTO public.cinemas (name, location, country, images) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await DB.query(query, [
      name,
      location,
      country,
      JSON.stringify(imageNames),
    ]);
    console.log("Cinema added:", result.rows[0]);
  } catch (err) {
    console.error("Error adding cinema:", err);
  }
}

const cinemaDetails = {
  name: "Cinéphoria Bercy",
  location: "2 Cr Saint-Emilion, 75012 Paris",
  country: "France",
  images: [
    {
      originalname: "image1.jpg",
      buffer: fs.readFileSync(path.join(__dirname, "../../client/public/images/cinema/Bercy.webp")),
    },
  ],
};

addCinema(
  cinemaDetails.name,
  cinemaDetails.location,
  cinemaDetails.country,
  cinemaDetails.images
);
