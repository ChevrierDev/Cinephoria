const { body, validationResult } = require("express-validator");
const DB = require("../../config/postgres.config");

const postShowtimesValidator = () => {
  return [
    body("day")
      .notEmpty()
      .withMessage("La date de la séance est obligatoire.")
      .isDate({ format: "DD/MM/YYYY", strictMode: true })
      .withMessage(
        "La date de la séance doit être une date valide au format DD/MM/YYYY."
      ),
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
      .isURL()
      .withMessage("Le QR code doit être une URL valide.")
      .trim()
  ];
};

const updateShowtimesValidator = () => {
    return [
      body("day")
        .optional()
        .isDate({ format: "DD/MM/YYYY", strictMode: true })
        .withMessage(
          "La date de sortie doit être une date valide au format DD/MM/YYYY."
        )
        .trim(),
      body("start_time")
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("L'heure de début doit être une heure valide au format HH:mm.")
        .trim(),
      body("end_time")
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("L'heure de fin doit être une heure valide au format HH:mm.")
        .trim(),
      body("price")
        .optional()
        .isFloat({ gt: 0 })
        .withMessage("Le prix doit être un nombre positif."),
      body("qr")
        .optional()
        .isURL()
        .withMessage("Le QR code doit être une URL valide.")
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

module.exports = { postShowtimesValidator, updateShowtimesValidator, validateShowtimes };