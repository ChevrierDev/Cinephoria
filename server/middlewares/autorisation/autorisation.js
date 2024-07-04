const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../../.env" });

function checkAuthenticated(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found, redirecting to login.");
    const redirectUrl = req.params.id ? `/reservation/login/${req.params.id}` : "/login";
    return res.redirect(redirectUrl);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded successfully:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Error verifying token: ", err.message);
    const redirectUrl = req.params.id ? `/reservation/login/${req.params.id}` : "/login";
    res.redirect(redirectUrl);
  }
}

async function isLogged(req, res) {
  const token = req.cookies.token;
  
  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ loggedIn: true });
  } catch (err) {
    return res.json({ loggedIn: false });
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

module.exports = { checkAuthenticated, checkRole, isLogged };
