require("dotenv").config({ path: "../../.env" });
const { hashPassword } = require("../utils/hashPassword");
const DB = require("../config/postgres.config");

//create amdin account
async function createAdminAccount(first_name, last_name, email, password, username) {
  try {
    const passwordHash = await hashPassword(password);
    const query =
      "INSERT INTO users (first_name, last_name, email, password, role, username) VALUES ($1, $2, $3, $4, 'admin', $5)";
    await DB.query(query, [first_name, last_name, email, passwordHash, username]);
    console.log("Admin account successfully created !");
  } catch (err) {
    console.error("Error with admin account creation :", err);
  }
}

// use the command line to create admin account
const first_name = process.argv[2];
const last_name = process.argv[3];
const email = process.argv[4];
const password = process.argv[5];
const username = process.argv[6];

console.log(process.argv[2])

if (!first_name || !last_name || !email || !password || !username) {
  console.log("Please provied all field");
} else {
  createAdminAccount(first_name, last_name, email, password, username);
}
