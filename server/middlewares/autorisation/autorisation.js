const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../../.env" });

function checkAuthenticated(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found, redirecting to login.");
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Error verifying token: ", err.message);
    res.redirect("/login");
  }
}

function checkRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.redirect("/login");
    }
  };
}

module.exports = { checkAuthenticated, checkRole };
