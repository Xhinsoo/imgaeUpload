const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const multer = require("multer");



app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")


const imgArray = [ ];

app.get("/home", (req,res,next)=>{
    const image = imgArray;
    console.log(image)
    res.render("home", {image})
})

app.post("/home", (req,res)=>{
    const {image} = req.body;
    imgArray.push(image)
    res.redirect("/home")
})
app.get("/new", (req,res)=>{
    res.render("new")
})

app.use((err,req,res,next)=>{
    console.log(err.message)
})
app.listen(3000, (req,res)=>{
    console.log("listening 3000")
})
