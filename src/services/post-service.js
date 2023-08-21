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
    }
  },

  async addPost(info) {
    const { userId, date, title, content } = info;
    const day = await dayModel.find({ userId, date });
    const dateId = day._id;

    const result = await postModel.create({
      userId,
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
