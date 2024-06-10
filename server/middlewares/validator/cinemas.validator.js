const { body, validationResult } = require("express-validator");

const postCinemasValidator = () => {
  return [
    body("name")
      .notEmpty()
      .isString()
      .withMessage("Le nom est obligatoire.")
      .trim()
      .escape(),
    body("location")
      .notEmpty()
      .withMessage("L'adresse est obligatoire.")
      .trim()
      .escape(),
    body("country")
      .notEmpty()
      .isString()
      .isLength({ max: 50 })
      .withMessage("Le pays est obligatoire.")
      .trim()
      .escape(),
  ];
};

async function validateCinemas(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { postCinemasValidator, validateCinemas };