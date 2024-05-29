const mongoose=  require("mongoose");
const {Schema} = mongoose;

const imageSchema = new Schema({
    url: String,
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

})

module.exports.Image = mongoose.model("Image",imageSchema)

