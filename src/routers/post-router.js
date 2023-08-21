import { Router } from "express";
import { PostController } from "../controllers/post-controller.js";
import { postValidator } from "../middlewares/validators/post-validator.js";

const postRouter = Router();

// 한 회원의 게시글 전체 조회
postRouter.get("/posts/:userId", PostController.getPosts);
// 게시글 개별 전체 조회
postRouter.get("/post/:postId", PostController.getAPost);
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
