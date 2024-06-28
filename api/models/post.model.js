import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title:{
        type:String,
        required: true,
        unique: true
    },
    content:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        default:"https://miro.medium.com/v2/resize:fit:1400/1*txEDZrBb36U46_zQrGP2jA.png"
    },
    category:{
        type: String,
        require: true,
    },
    slug:{
        type: String,
        required:true,
        unique: true
    }

},{timestamps: true}
)

const Post = mongoose.model('Post',postSchema);

export default Post;