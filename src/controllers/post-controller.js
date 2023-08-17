import { PostService } from "../services/post-service.js";

const PostController = {
  async getPost(req, res, next) {
    try {
      const { id, date } = req.body;
      const result = await PostService.findPostsByIdAndDate({ userId: id, date });
      res.status(200).json({});
    } catch {}
  },

  async createPost(req, res, next) {
    try {
    } catch {}
  },

  async updatePost(req, res, next) {
    try {
    } catch {}
  },

  async deletePost(req, res, next) {
    try {
    } catch {}
  },
};

export { PostController };
