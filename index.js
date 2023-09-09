const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blog");

const Blog = require("./models/blog");
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
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve("./public")));

// set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// routes
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find();
  return res.render("home", {
    blog: allBlogs,
  });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));
