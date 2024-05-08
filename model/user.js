const mongoose = require("mongoose");
const { Schema } = mongoose;

//connecting to mongoDB

//schema not only define the structure of your document and casting properties,
//they also define document instance methods and middleware
const userSchema = new Schema({
  email: String,
  user :String,
  userId: String,
});

//mongoose collection name is Users, model name is User
//model class called Movie declaration, now we can make instances of movie class and save it to DB
const User = mongoose.model("User", userSchema);




module.exports = User