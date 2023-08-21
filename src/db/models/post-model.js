import { model } from "mongoose";
import { postSchema } from "../schemas/post-schema.js";

const Post = model("posts", postSchema);

class PostModel {
  async find(info) {
    const result = await Post.find(info);
    return result;
  }

  async findById(id) {
    const result = await Post.findById(id);
    console.log(result);
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
      { returnOriginal: false }
    );
    return result;
  }

  async deletePost(id) {
    const result = await Post.findByIdAndDelete(id);
    return result;
  }
}

const postModel = new PostModel();

export { postModel };
