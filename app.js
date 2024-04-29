const { error } = require("console");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate")


// app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")

app.get("/home", (req,res,next)=>{
    res.render("home")
})

app.get("/new", (req,res)=>{
    res.render("new")
})
app.post("/home", (req,res)=>{
    console.log(req.body);  
    res.redirect("/home")
})

app.use((err,req,res,next)=>{
    console.log(err.message)
})
app.listen(3000, (req,res)=>{
    console.log("listening 3000")
})
