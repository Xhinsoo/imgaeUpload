const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Image = require("../model/image")



router.get("/home", async (req, res, next) => {
    const image = await Image.find({});
    console.log(image)
    res.render("pages/home", {image});
  });
  



  module.exports = router;