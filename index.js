const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 8000;

// connect mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then((e) => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

// middleware
app.use(express.urlencoded({ extended: false }));

// set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// routes
app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));
