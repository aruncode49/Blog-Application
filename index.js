const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const { checkForAuthCookie } = require("./middleware/auth");

const app = express();
const PORT = 8000;

// connect mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then((e) => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// routes
app.get("/", checkForAuthCookie("token"), (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));
