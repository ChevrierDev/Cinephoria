const { body, validationResult } = require("express-validator");
const DB = require("../../config/postgres.config");
const moment = require('moment');

const postReviewsValidator = () => {
  return [
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("La note doit être un entier positif."),
    body("comment")
      .notEmpty()
      .isString()
      .isLength({max: 250})
      .withMessage("Le commentaire est obligatoire.")
      .trim()
      .escape(),
    body("status")
      .notEmpty()
      .isBoolean()
      .withMessage("Status doit être un booléen."),
    body('created_at')
      .notEmpty()
      .withMessage("Le jour et l'heure de création sont obligatoires.")
      .isISO8601()
      .withMessage("Le format de la date de création n'est pas valide.")
      .custom((value, { req }) => {
        if (!moment(value).isSameOrBefore(moment())) {
          throw new Error("La date de création ne peut pas être dans le futur.");
        }
        return true;
      })
  ];
};

async function validateReviews(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { postReviewsValidator, validateReviews };