import { PostService } from "../services/post-service.js";
import { ObjectId } from "mongodb";

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
      const userId = new ObjectId(req.params.userId);
      const { date, title, content } = req.body;
      const result = await PostService.addPost({
        userId,
        date,
        title,
        content,
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  async updatePost(req, res, next) {
    try {
      console.log(req.params);
      const id = req.params.postId;
      console.log(id);
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
      console.log(req.params);
      const id = req.params.postId;
      const result = await PostService.removePost(id);
      res.status(200).json({
        title: result.title,
        content: result.content,
        userId: result.userId,
        id: result._id,
        createdAt: result.createdAt,
      });
    } catch (error) {
      res.status(400).json(error);
      // next(error);
    }
  },
};

export { PostController };
