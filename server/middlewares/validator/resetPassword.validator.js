const { body, validationResult } = require("express-validator");
const moment = require("moment");

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_\u2014\u2013])[A-Za-z\d!@#$%^&*()\-_\u2014\u2013]{8,}$/;

const postResetPasswordValidator = () => {
  return [
    body("newPassword")
      .notEmpty()
      .withMessage("Vous devez configurer un nouveau mot de passe.")
      .isString()
      .isLength({ min: 8, max: 50 })
      .withMessage(
        "Le mot de passe doit faire minimum 8 caractères et maximum 50 caractères."
      )
      .custom((pass) => {
        if (!passwordRegex.test(pass)) {
          throw new Error(
            "Le mot de passe doit contenir au moins une majuscule, 8 caractères, un caractère spécial et un chiffre."
          );
        }
        return true;
      })
      .withMessage(
        "Le mot de passe doit contenir au moins une majuscule, 8 caractères, un caractère spécial et un chiffre."
      )
      .trim(),
    body("confirmPassword")
    .notEmpty()
    .withMessage("Vous devez confimer le mot de passe.")
    .isString()
    .custom((value , {req}) =>{
      if (value !== req.body.newPassword) {
        throw new Error('Les mot de passes ne correspondent pas.');
      }
      return true;
    })
  ];
};

async function validateResetPassword(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { postResetPasswordValidator, validateResetPassword };
