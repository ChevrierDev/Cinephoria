const { body, validationResult } = require("express-validator");
const DB = require("../../config/postgres.config");


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
  ];
};

async function validateReviews(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach(error => {
      req.flash('error_msg', error.msg); 
    });
    return res.redirect('back');
  }
  next();
}

module.exports = { postReviewsValidator, validateReviews };