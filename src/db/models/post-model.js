import { model } from "mongoose";
import { postSchema } from "../schemas/post-schema.js";

const Post = new model("posts", postSchema);

class PostModel {}

const postModel = new PostModel();

export { postModel };
