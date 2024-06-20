const { getUserById } = require("../controllers/users/users.controllers");
const jwt = require("jsonwebtoken");
const passport = require('passport');
require("dotenv").config({ path: "../../.env" });
const { ExtractJwt } = require('passport-jwt');

// get specific user data
async function enrichUserWithInfo(req, res, next) {
  if (req.user.sub) {
    try {
      const fakeReq = { params: { id: req.user.sub } };
      const userInfo = await getUserById(fakeReq, res);
      if (userInfo) {
        req.user.details = userInfo;
      } else {
        console.log("No user found with the given ID");
      }
    } catch (err) {
      console.log("Failed to fetch user details:", err);
      return res.status(500).send("Internal server error");
    }
  }
  next();
}


function checkUser(req, res, next) {
  // Extract the token from the cookie
  const token = req.cookies.token;

  if (!token) {
    res.locals.isAuthenticated = false;
    res.locals.user = null;
    return next();
  }

  // Manually extract and verify the token
  const jwtPayload = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  req.headers.authorization = `Bearer ${token}`;

  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    console.log('User:', user);
    if (user) {
      req.user = user;
      res.locals.isAuthenticated = true;
      res.locals.user = user;
    } else {
      res.locals.isAuthenticated = false;
      res.locals.user = null;
    }
    next();
  })(req, res, next);
}


module.exports = { enrichUserWithInfo, checkUser };
