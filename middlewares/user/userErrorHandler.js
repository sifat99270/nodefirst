const User = require("../../models/usersSchema");
const createError = require("http-errors");
const { validationResult, check } = require("express-validator");
const { unlink } = require("fs");
const path = require("path");
const addUserValidator = [
  check("name")
    .isLength({ min: 4 })
    .withMessage("name must be 4 caracter")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("email already in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be 6 caracter "),
];
function addUserValidatorHandler(req, res, next) {
  const error = validationResult(req);
  const mappedError = error.mapped();
  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `../../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    return res.status(500).json({
      errors: mappedError,
    });
  }
}
module.exports = {
  addUserValidator,
  addUserValidatorHandler,
};
