import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
       ref:"blog"
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
       ref:"blog"
    },
    text:{
        type:String,
        required:true
    },
},{timestamps:true})
export default mongoose?.models?.Comment|| mongoose.model("Comment",CommentSchema)