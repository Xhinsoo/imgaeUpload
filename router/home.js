const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Image = require("../model/image");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });





router.get("/home", async (req, res, next) => {
    const image = await Image.find({});
    console.log(image)
    res.render("pages/home", {image});
  });
  
router.post("/home", upload.array("avatar"), async(req, res) => {
    const { url,title } = req.body.image;
    const newImage = new Image({url, title}); 
    await newImage.save()
    res.redirect("home");
  });
  


  module.exports = router;