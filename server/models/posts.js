import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  name:String,
  creator:String,
  tag: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;