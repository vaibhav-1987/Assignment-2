const mongoose = require ("mongoose")

const PostSchema = new mongoose.Schema ({
    title : {type : String , required  : true},
    body : { type: String , required : true},
    image : { type : String ,required : true},
    user :{ type:mongoose.Schema.Types.ObjectId ,ref:"User"}

})
const Post = mongoose.model("post", PostSchema); 
module.exports = Post