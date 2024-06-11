const { body, validationResult  } = require("express-validator");
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

    body("role")
      .notEmpty()
      .isString()
      .withMessage("La valeur doit être une chaine de caractère.")
      .isLength({ max: 20 })
      .withMessage("La valeur ne doit pas dépasser 20 caractère.")
      .trim()
      .escape(),
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

    body("role")
      .notEmpty()
      .isString()
      .withMessage("La valeur doit être une chaine de caractère.")
      .isLength({ max: 20 })
      .withMessage("La valeur ne doit pas dépasser 20 caractère.")
      .trim()
      .escape(),
  ];
};

async function validateUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

  module.exports= {postUserValidator, validateUser, updateUserValidator}