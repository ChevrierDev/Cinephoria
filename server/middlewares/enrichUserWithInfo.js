const { getUserById } = require('../controllers/users/users.controllers');

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
  };

  module.exports = { enrichUserWithInfo };