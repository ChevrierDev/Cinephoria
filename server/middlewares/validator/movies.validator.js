const { body, validationResult } = require("express-validator");
const DB = require("../../config/postgres.config");

const postMovieValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Le titre est obligatoire.")
      .trim()
      .escape(),
    body("duration")
      .isInt({ min: 1, max: 400 })
      .withMessage("La durée doit être un entier positif."),
    body("genre")
      .notEmpty()
      .withMessage("Le genre est obligatoire.")
      .trim()
      .escape(),
    body("pg")
      .isInt({ min: 0, max: 50 })
      .withMessage("La classification PG doit être un entier.")
      .toInt(),
    body("banner")
      .notEmpty()
      .withMessage("La bannière est obligatoire.")
      .trim()
      .escape(),
    body("poster")
      .notEmpty()
      .withMessage("L'affiche est obligatoire.")
      .trim()
      .escape(),
    body("video")
      .notEmpty()
      .withMessage("La vidéo est obligatoire.")
      .trim()
      .escape(),
    body("favorite")
      .isBoolean()
      .withMessage("Favori doit être un booléen."),
    body("description")
      .notEmpty()
      .withMessage("La description est obligatoire.")
      .trim()
      .escape(),
    body("casting")
      .notEmpty()
      .withMessage("Le casting est obligatoire.")
      .trim()
      .escape(),
    body("release_date")
      .notEmpty()
      .withMessage("La date de sortie est obligatoire.")
      .isDate({ format: "DD/MM/YYYY", strictMode: true })
      .withMessage(
        "La date de sortie doit être une date valide au format DD/MM/YYYY."
      )
      .trim()
  ];
};

async function validateMovie(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { postMovieValidator, validateMovie };