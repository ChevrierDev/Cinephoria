require("dotenv").config({ path: "../../.env" });
const express = require("express");
const { compareHashedPassword } = require("../utils/hashPassword");
const jwtToken = require("jsonwebtoken");
const DB = require("../config/postgres.config");
const authRouter = express.Router();

authRouter.post("/auth", async (req, res, next) => {
    try {
        const findUserQuery = `SELECT * FROM users WHERE email = $1`;
        const { email, password } = req.body; 
        const { rows } = await DB.query(findUserQuery, [email]);
      
        if (rows.length <= 0) {
          return res.status(404).json({ message: "No user found with this email address." });
        }
      
        const user = rows[0];
      
        const verifyPassword = await compareHashedPassword(password, user.password);
      
        if (!verifyPassword) {
          return res.status(401).json({ message: "Incorrect password." });
        }
      
        const token = jwtToken.sign(
          {
            sub: user.user_id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
      
        return res.status(200).json({ message: "User logged in", accessToken: token });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = authRouter;
