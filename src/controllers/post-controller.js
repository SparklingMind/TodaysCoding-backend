import { PostService } from "../services/post-service.js";

const PostController = {
  async getPost(req, res, next) {
    try {
      const { id, date } = req.body;
      const result = await PostService.findPostsByIdAndDate({
        id,
        date,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async createPost(req, res, next) {
    try {
      const { id, date, title, content } = req.body;
      const result = await PostService.addPost({
        id,
        date,
        title,
        content,
      });

      res.status(200).json({
        title: result.title,
        content: result.content,
        userId: result.userId,
        id: result._id,
        createdAt: result.createdAt,
      });
    } catch (error) {
      next(error);
    }
  },

  async updatePost(req, res, next) {
    try {
      const id = req.params.id;
      const { title, content } = req.body;

      const result = await PostService.changePost({ id, title, content });
      res.status(200).json({
        title: result.title,
        content: result.content,
        userId: result.userId,
        id: result._id,
        createdAt: result.createdAt,
      });
    } catch (error) {
      next(error);
    }
  },

  async deletePost(req, res, next) {
    try {
      const id = req.params.id;
      const result = await PostService.removePost(id);
      res.status(200).json({
        title: result.title,
        content: result.content,
        userId: result.userId,
        id: result._id,
        createdAt: result.createdAt,
      });
    } catch {}
  },
};

export { PostController };
