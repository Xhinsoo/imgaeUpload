const express = require("express");
const router = express.Router();
const {requireLogin} = require("../middleware/login")


router.get("/secret", requireLogin, (req,res)=>{
    res.send("this is secret")
  })
  

  module.exports = router