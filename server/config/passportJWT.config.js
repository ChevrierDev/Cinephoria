require('dotenv').config({ path: '../../.env' });
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const DB = require('../config/postgres.config');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: ['HS256'],
};

const Strategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const findUserQuery = `SELECT * FROM users WHERE user_id = $1`;
        const userResult = await DB.query(findUserQuery, [jwtPayload.sub]);

        if (userResult.rows.length <= 0) {
            return done(null, false, { message: "No users found with this user ID" });
        }

        const user = userResult.rows[0];

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

module.exports = (passport) => {
    passport.use(Strategy);
};
