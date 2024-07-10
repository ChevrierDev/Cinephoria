const { body, validationResult } = require("express-validator");
const DB = require("../../config/postgres.config");

const checkEmailExists = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await DB.query(query, [email]);
  return result.rows.length > 0;
};

const postUserValidator = () => {
  return [
    body("first_name")
      .notEmpty()
      .isString()
      .withMessage("La valeur doit être une chaine de caractère.")
      .isLength({ max: 50 })
      .withMessage("La valeur ne doit pas dépasser 50 caractère.")
      .trim()
      .escape(),

    body("last_name")
      .notEmpty()
      .isString()
      .withMessage("La valeur doit être une chaine de caractère.")
      .isLength({ max: 50 })
      .withMessage("La valeur ne doit pas dépasser 50 caractère.")
      .trim()
      .escape(),

    body("password")
      .notEmpty()
      .isString()
      .withMessage("La valeur doit être une chaine de caractère.")
      .isLength({ max: 50 })
      .withMessage("La valeur ne doit pas dépasser 50 caractère.")
      .trim()
      .custom((value) => {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_!@#$%^&*]).+$/;
        if (!passwordRegex.test(value)) {
          throw new Error(
            "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."
          );
        }
        return true;
      }),

    body("confirmPassword")
      .notEmpty()
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(
            "La confirmation du mot de passe doit être identique au mot de passe."
          );
        }
        return true;
      }),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("La valeur doit être une adresse email.")
      .isLength({ max: 50 })
      .withMessage("La valeur ne doit pas dépasser 50 caractère.")
      .custom(async (email) => {
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
          throw new Error("Email already exists");
        }
      })
      .withMessage("Un utilisateur avec cette addresse mail existe déjà.")
      .trim(),
  ];
};

const updateUserValidator = () => {
  return [
    body("first_name")
      .notEmpty()
      .isString()
      .withMessage("La valeur doit être une chaine de caractère.")
      .isLength({ max: 50 })
      .withMessage("La valeur ne doit pas dépasser 50 caractère.")
      .trim()
      .escape(),
    body("password")
      .notEmpty()
      .isString()
      .withMessage("La valeur doit être une chaine de caractère.")
      .isLength({ max: 50 })
      .withMessage("La valeur ne doit pas dépasser 50 caractère.")
      .trim()
      .custom((value) => {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_!@#$%^&*]).+$/;
        if (!passwordRegex.test(value)) {
          throw new Error(
            "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."
          );
        }
        return true;
      }),

    body("confirmPassword")
      .notEmpty()
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(
            "La confirmation du mot de passe doit être identique au mot de passe."
          );
        }
        return true;
      }),

    body("last_name")
      .notEmpty()
      .isString()
      .withMessage("La valeur doit être une chaine de caractère.")
      .isLength({ max: 50 })
      .withMessage("La valeur ne doit pas dépasser 50 caractère.")
      .trim()
      .escape(),

    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("La valeur doit être une adresse email.")
      .isLength({ max: 50 })
      .withMessage("La valeur ne doit pas dépasser 50 caractère.")
      .trim(),
  ];
};

async function validateUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorMsg = errors.array().map(err => err.msg); 
    req.flash('error_msg', errorMsg);
    return res.redirect('back');
  }
  next();
}

module.exports = { postUserValidator, validateUser, updateUserValidator };
