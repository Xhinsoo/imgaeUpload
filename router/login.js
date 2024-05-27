const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Image = require("../model/image");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });


router.get("/login", (req, res) => {
    res.render("pages/login");
  });
  
router.post("/login", async (req, res) => {
    const { user, password } = req.body.login;
    const registeredUser = await User.findOne({user});
    if(!registeredUser){
      return res.send("invalid email")
    } 
    if(registeredUser.password !== password){
     return res.send("invalid password");
    }
    req.session.user_id = registeredUser._id;
    res.redirect("home")
  });


  module.exports = router