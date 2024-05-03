if(process.env.NODE_ENV !=="production"){
  require("dotenv").config();
}


const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const multer = require("multer");

const {storage} = require("./cloudinary")
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const imgArray = [];

app.get("/home", (req, res, next) => {
  const image = imgArray;
  res.render("home", { image });
});

app.post("/home", upload.array("avatar"), (req, res) => {
  // const { image } = req.body;
  // imgArray.push(image);
  // console.log(imgArray)
  console.log(req.files)
  res.redirect("/home");
});
app.get("/new", (req, res) => {
  res.render("new");
});

app.use((err, req, res, next) => {
  console.log(err.message);
});
app.listen(3000, (req, res) => {
  console.log("listening 3000");
});
