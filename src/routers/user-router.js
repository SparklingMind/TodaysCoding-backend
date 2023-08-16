import { Router } from "express";
import { UserController } from "../controllers/user-controller";

const userRouter = Router();

// 회원가입
userRouter.post("/register", UserController.createUser);
// 로그인
userRouter.post("/login", UserController.login);
// 사용자 정보 조회
userRouter.get("/users", UserController.getUser);
// 사용자 정보 수정
userRouter.patch("/users", UserController.updateUser);
// 사용자 정보 삭제(탈퇴)
userRouter.delete("/users", UserController.deleteUser);

export { userRouter };
