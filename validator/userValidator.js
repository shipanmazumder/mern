const { check } = require("express-validator");
const User = require("../models/User");

exports.registerValidate = [
  check("name").not().isEmpty().withMessage("Name Required"),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(
            "E-Mail exists already, please pick a different one."
          );
        }
      });
    }),
  check("password").not().isEmpty().withMessage("Password Required"),
  check(
    "passwordConfirmation",
    "passwordConfirmation field must have the same value as the password field"
  ).custom((value, { req }) => value === req.body.password),
];
exports.loginValidate = [
  check("email").isEmail().withMessage("Please enter a valid email address."),
  check("password", "Password has to be valid.")
    .isLength({ min: 5 })
    .isAlphanumeric(),
];
