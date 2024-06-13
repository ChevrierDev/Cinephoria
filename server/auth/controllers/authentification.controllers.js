require("dotenv").config({ path: "../../../.env" });
const { compareHashedPassword } = require("../../utils/hashPassword");
const jwtToken = require("jsonwebtoken");
const DB = require("../../config/postgres.config");

async function authUser(req, res) {
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
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 2 * 60 * 60 * 1000,
    });

    if (user.must_change_password) {
      return res.redirect('/update-pass')
    }

    console.log("User logged in, token:", token);

    switch (user.role) {
      case "admin":
        return res.redirect("/dashboard/admin");
      case "employee":
        return res.redirect("/dashboard/employee");
      case "user":
        return res.redirect("/dashboard/user");
    }

    return res.status(200).json({ message: "User logged in", accessToken: token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}


module.exports = { authUser };
