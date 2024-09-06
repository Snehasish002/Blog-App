import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";


const PostSchma = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String
},{
    timestamps: true,

})

const PostModel = model('Post',PostSchma);

export default PostModel;