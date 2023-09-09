const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const Blog = require("../models/blog");

// creating multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("cover_image"), async (req, res) => {
  const { title, body } = req.body;
  const { filename } = req.file;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
