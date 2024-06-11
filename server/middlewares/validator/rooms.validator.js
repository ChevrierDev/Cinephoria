const { body, validationResult } = require("express-validator");
const DB = require("../../config/postgres.config");

const postRoomsValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Le nom est obligatoire.")
      .isString()
      .withMessage("Le nom doit être une chaine de caractère.")
      .isLength({ max: 250 })
      .trim()
      .escape(),
    body("quality")
      .notEmpty()
      .withMessage("La qualité est obligatoire.")
      .isString()
      .withMessage("La qualité doit être une chaine de caractère.")
      .isLength({ max: 250 })
      .trim()
      .escape(),
  ];
};

async function validateRooms(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { postRoomsValidator, validateRooms };

