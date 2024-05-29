const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Image = require("../model/image");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.get("/new",  (req, res) => {
    res.render("new");
  });
  

  module.exports = router;