import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import { userValidator } from "../middlewares/validators/user-validator.js";

const userRouter = Router();

// 회원가입
userRouter.post(
  "/users/register",
  userValidator.registerValidator,
  UserController.createUser
);
// 회원가입 아이디 중복 확인
userRouter.post(
  "/users/register/:loginId",
  UserController.checkDuplicationOfId
);
// 로그인
userRouter.post(
  "auth/login",
  userValidator.loginValidator,
  UserController.login
);
// 사용자 정보 조회
userRouter.get("/users/:userId", UserController.getUser);
// 사용자 정보 수정
userRouter.patch(
  "/users/:userId",
  userValidator.updateUserValidator,
  UserController.updateUser
);
// 사용자 정보 삭제(탈퇴)
userRouter.delete("/users/:userId", UserController.deleteUser);

export { userRouter };
