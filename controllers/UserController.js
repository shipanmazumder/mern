const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const User = require("../models/User");
const { response } = require("../util/responseFormat");
const { validationError } = require("../util/error");

var privateKey = fs.readFileSync("./jwtRS256.key");
module.exports = {
  register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res,errors)
    }
    bcrypt
      .hash(req.body.password, 12)
      .then((hasPassword) => {
        req.body.password = hasPassword;
        let user = new User(req.body);
        user
          .save()
          .then((user) => {
            response(res, true, 200, "User Create Successfull", user);
          })
          .catch((err) => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
          });
      })
      .catch((err) => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  },
  login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return response(res,false,404,'Email/Password Invalid');
        }
        bcrypt
          .compare(password, user.password)
          .then((doMatch) => {
            if (doMatch) {
              var token = jsonwebtoken.sign({ data: user }, privateKey, {
                algorithm: "RS256",
                expiresIn: 60 * 60,
              });
              var data = {
                status: true,
                code: 200,
                token: `Bearer ${token}`,
                message: ["Login Success"],
                data: user,
              };
              return res.json(data);
            }
            response(res,false,404,'Email/Password Invalid');
          })
          .catch((err) => {
            console.log(err);
            res.redirect("/login");
          });
      })
      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  },
};
