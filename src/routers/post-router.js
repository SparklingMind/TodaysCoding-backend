import { Router } from "express";
import { PostController } from "../controllers/post-controller.js";
import { postValidator } from "../middlewares/validators/post-validator.js";

const postRouter = Router();

// 게시글 전체 조회
postRouter.get("/post", PostController.getPost);
// 게시글 추가
postRouter.post(
  "/post/:userId",
  postValidator.createPostValidator,
  PostController.createPost
);
// 게시글 수정
postRouter.patch(
  "/post/:postId",
  postValidator.updatePostValidator,
  PostController.updatePost
);
// 게시글 삭제
postRouter.delete("/post/:postId", PostController.deletePost);

export { postRouter };
