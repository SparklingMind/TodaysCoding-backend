import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import { userValidator } from "../middlewares/validators/user-validator.js";

const userRouter = Router();

// 회원가입
userRouter.post(
  "/register",
  userValidator.registerValidator,
  UserController.createUser
);
// 로그인
userRouter.post("/login", userValidator.loginValidator, UserController.login);
// 사용자 정보 조회
userRouter.get("/users/:id", UserController.getUser);
// 사용자 정보 수정
userRouter.patch(
  "/users/:id",
  userValidator.updateUserValidator,
  UserController.updateUser
);
// 사용자 정보 삭제(탈퇴)
userRouter.delete("/users/:id", UserController.deleteUser);

export { userRouter };
