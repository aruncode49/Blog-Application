const express = require("express");
const User = require("../models/user");

const router = express.Router();

// signup get
router.get("/signup", (req, res) => {
  return res.render("signup");
});

// signin get
router.get("/signin", (req, res) => {
  return res.render("signin");
});

// signup post
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

// signin post
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchUserAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
});

// logout route
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
