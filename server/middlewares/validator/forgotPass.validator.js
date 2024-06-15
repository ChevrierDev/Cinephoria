const { body, validationResult } = require("express-validator");
const DB = require("../../config/postgres.config");

const postForgotPassValidator = () => {
  return [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Une addresse email valide est obligatoire !")
      .custom(async (email) => {
        const query = `SELECT * FROM users WHERE email = $1`;
        const user = await DB.query(query, [email]);
        if (user.rows.length === 0) {
          throw new Error("Aucun utilisateur avec cette adresse email existe.");
        }
      })
      .withMessage("Aucun utilisateur avec cette adresse email existe.")
      .trim(),
  ];
};

async function validateForgotPass(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { postForgotPassValidator, validateForgotPass };
