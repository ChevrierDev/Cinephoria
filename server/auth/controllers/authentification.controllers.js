require("dotenv").config({ path: "../../../.env" });
const { compareHashedPassword } = require("../../utils/hashPassword");
const jwtToken = require("jsonwebtoken");
const DB = require("../../config/postgres.config");

async function authUser(req, res) {
  try {
    const { email, password, redirect } = req.body;
    const findUserQuery = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await DB.query(findUserQuery, [email]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé avec cette adresse email." });
    }

    const user = rows[0];

    const verifyPassword = await compareHashedPassword(password, user.password);

    if (!verifyPassword) {
      return res.status(401).json({ message: "Mot de passe incorrecte." });
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
      maxAge: 1 * 60 * 60 * 1000,
    });

    if (user.must_change_password) {
      if (user.role === "user") {
        return res.redirect('/dashboard/user/reset-pass');
      }
      if (user.role === "admin") {
        return res.redirect('/dashboard/admin/reset-pass');
      }
      if (user.role === "employee") {
        return res.redirect('/dashboard/employee/reset-pass');
      }
    }

    console.log("User logged in, token:", token);

    const redirectUrl = redirect || `/dashboard/${user.role}`;
    if (req.headers['x-electron-request']) {
      return res.status(200).json({ token, redirectUrl: 'employeeDashboard.html' });
    } else {
      return res.redirect(redirectUrl);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { authUser };
