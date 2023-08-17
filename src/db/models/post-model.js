import { model } from "mongoose";
import { postSchema } from "../schemas/post-schema.js";

const Post = model("posts", postSchema);

class PostModel {
  async find(info) {
    const result = await Post.find(info);
    return result;
  }

  async create(info) {
    const result = await Post.create(info);
    return result;
  }

  async findAndUpdatePost(info) {
    const { id, title, content } = info;
    const result = await Post.findByIdAndUpdate(
      id,
      { title, content },
      {
        returnOriginal: false,
      }
    );
    return result;
  }

  async deletePost(id) {
    console.log(id);
    const result = await Post.findByIdAndDelete(id);
    console.log(result);
    return result;
  }
}

const postModel = new PostModel();

export { postModel };
