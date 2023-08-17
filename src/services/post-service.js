import { postModel } from "../db/models/post-model.js";
import { dayModel } from "../db/models/day-model.js";

const PostService = {
  async findPostsByIdAndDate(info) {
    const day = await dayModel.find(info);

    if (day.length > 0) {
      const dateId = day._id;
      const userId = info.id;
      const posts = postModel.find({ userId, dateId });
      return posts;
    } else {
      return { error: "no posts" };
    }
  },

  async addPost(info) {
    const { id, date, title, content } = info;

    const day = await dayModel.find({ id, date });
    const dateId = day._id;

    const result = await postModel.create({
      userId: id,
      dateId,
      title,
      content,
    });
    return result;
  },

  async changePost(info) {
    const { id, title, content } = info;
    const result = await postModel.findAndUpdatePost({
      id,
      title,
      content,
    });
    return result;
  },

  async removePost(id) {
    const result = await postModel.deletePost(id);
    return result;
  },
};

export { PostService };
