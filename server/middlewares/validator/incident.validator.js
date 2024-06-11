const { body, validationResult  } = require("express-validator");
const DB = require("../../config/postgres.config");


const postIncidentValidator = () => {
  return [
    body("description")
      .notEmpty()
      .isString()
      .withMessage("La valeur doit être une chaine de caractère.")
      .isLength({ max: 50 })
      .withMessage("La valeur ne doit pas dépasser 50 caractère.")
      .trim()
      .escape(),
      
    body("report_date")
      .notEmpty()
      .isString()
      .withMessage("La valeur doit être une chaine de caractère.")
      .isLength({ max: 50 })
      .withMessage("La valeur ne doit pas dépasser 50 caractère.")
      .trim()
      .escape(),
  ];
};

async function validateIncident(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

  module.exports= {postIncidentValidator, validateIncident}