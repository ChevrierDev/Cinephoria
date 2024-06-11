const { body, validationResult } = require("express-validator");
const DB = require("../../config/postgres.config");

const postShowtimesValidator = () => {
  return [
    body("day")
      .notEmpty()
      .withMessage("La date de la séance est obligatoire."),
    body("start_time")
      .notEmpty()
      .withMessage("L'heure de début est obligatoire.")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage("L'heure de début doit être une heure valide au format HH:mm.")
      .trim(),
    body("end_time")
      .notEmpty()
      .withMessage("L'heure de fin est obligatoire.")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage("L'heure de fin doit être une heure valide au format HH:mm.")
      .trim(),
    body("price")
      .notEmpty()
      .withMessage("Le prix est obligatoire.")
      .isFloat({ gt: 0 })
      .withMessage("Le prix doit être un nombre positif."),
    body("qr")
      .notEmpty()
      .withMessage("Le QR code est obligatoire.")
      .trim()
  ];
};



async function validateShowtimes(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { postShowtimesValidator, validateShowtimes };