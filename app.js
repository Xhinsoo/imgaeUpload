if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const multer = require("multer");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { storage } = require("./cloudinary");
const upload = multer({ storage });
const User = require("./model/user");
const Image = require("./model/image")
const { error } = require("console");
const homeRoutes = require("./router/home");
const newRoutes = require("./router/new");
const registerRoutes=  require("./router/register");
const loginRoutes = require("./router/login");
const secretRoutes = require("./router/secret");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");

//connecting to mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/imgUpload")
  .then(() => {
    console.log("connection open");
  })
  .catch((e) => {
    console.log("error is:", e);
  });

const requireLogin = (req,res,next) => {
  if(!req.session.user_id){
    return res.redirect("home")
  }
  next()}



//routes
app.use("/", homeRoutes)
app.use("/", newRoutes)
app.use("/", registerRoutes)
app.use("/", loginRoutes)
app.use("/", secretRoutes)


app.use((err, req, res, next) => {
  console.log(err.message);
});
app.listen(3000, (req, res) => {
  console.log("listening 3000");
});
