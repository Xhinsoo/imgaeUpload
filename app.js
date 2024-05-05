if(process.env.NODE_ENV !=="production"){
  require("dotenv").config();
}


const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const multer = require("multer");

const {storage} = require("./cloudinary")
const upload = multer({ storage });
const  User = require("./model/user")
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


//connecting to mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/imgUpload")
  .then(()=>{
    console.log("connection open")
  })
  .catch((e)=>{
    console.log("error is:", e)
  });



const imgArray = [];

app.get("/home", (req, res, next) => {
  const image = imgArray;
  res.render("home", { image });
});

app.post("/home", upload.array("avatar"), (req, res) => {
  const { image } = req.body;
  imgArray.push(image);
  console.log(req.body)
  res.redirect("/home");
});
app.get("/new", (req, res) => {
  res.render("new");
});

app.get("/login",(req,res)=>{
  res.render("login")
})

app.post("/login", (req,res)=>{
  console.log(req.body.login)
})


app.use((err, req, res, next) => {
  console.log(err.message);
});
app.listen(3000, (req, res) => {
  console.log("listening 3000");
});
