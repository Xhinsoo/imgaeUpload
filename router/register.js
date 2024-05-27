const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Image = require("../model/image");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const bcrypt = require("bcrypt")

router.get("/register", (req, res) => {
    res.render("pages/register");
  });
  


router.post("/register", async (req, res, next) => {
    const {user, password } = req.body.register;
    const hash = await bcrypt.hash(password, 12);
    const newUser = new User({user, password });
    const existingUser = await User.findOne({ user });
    
    try {
      if (existingUser) {
        throw new Error("existing user");
      } else {
        await newUser.save();
        req.session.user_id = newUser._id;
        res.redirect("home");
      }
    } catch (e) {
      next(e);
    }
  });

  module.exports = router;