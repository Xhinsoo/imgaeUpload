const mongoose=  require("mongoose");
const {Schema} = mongoose;

const imageSchema = new Schema({
    url: String,
    title: String,

})

const Image = mongoose.model("Image",imageSchema)

module.exports = Image