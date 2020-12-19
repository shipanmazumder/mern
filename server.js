const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const userRoute = require("./routers/userRoute");

const app = express();
const MONGO_CONFIG = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};
const port = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize())
require('./passport')(passport)

app.use("/api/users", userRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: "Page Not Found" });
});
//error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  var data = {
    status: false,
    code: 500,
    message: ["Internal Server Error"],
    data: null,
  };
  res.status(500).send(data);
});
mongoose
  .connect(process.env.MONGODBURI, MONGO_CONFIG)
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening on ${port} port!`);
    });
  })
  .catch((err) => console.log(err));
