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
const { error } = require("console");

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

const imgArray = [];

app.get("/home", (req, res, next) => {
  const image = imgArray;
  res.render("pages/home", { image });
});

app.post("/home", upload.array("avatar"), (req, res) => {
  const { image } = req.body;
  imgArray.push(image);
  res.redirect("pages/home");
});

app.get("/new", requireLogin, (req, res) => {
  res.render("pages/new");
});


app.get("/secret", requireLogin, (req,res)=>{
  res.send("this is secret")
})


app.get("/register", (req, res) => {
  res.render("pages/register");
});

app.post("/register", async (req, res, next) => {
  const {user, password } = req.body.register;
  const hash = await bcrypt.hash(password, 12);
  const newUser = new User({user, hash });
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

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.post("/login", async (req, res) => {
  const { user, password } = req.body.login;
  const registeredUser = await User.findOne({user});
  // console.log(registeredUser)

  if(!registeredUser){
    return res.send("invalid email")
  } 
  if(registeredUser.password !== password){

   return res.send("invalid password");
  }
  req.session.user_id = registeredUser._id;
  res.redirect("home")
});

app.use((err, req, res, next) => {
  console.log(err.message);
});
app.listen(3000, (req, res) => {
  console.log("listening 3000");
});
