const express = require("express");
const { register,login } = require("../controllers/UserController");
const userValidator = require("../validator/userValidator");

const route = express.Router();

route.post("/register", userValidator.registerValidate, register);
route.post("/login", userValidator.loginValidate, login);

module.exports = route;
