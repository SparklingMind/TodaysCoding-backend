import { Router } from "express";
import { TodoController } from "../controllers/todo-controller.js";
import { todoValidator } from "../middlewares/validators/todo-validator.js";
import { tokenMiddleware } from "../middlewares/token-middleware.js";

const todoRouter = Router();

// 해당 아이디가 만든 todo들 모두 조회
todoRouter.get("/todos", tokenMiddleware, TodoController.getTodo);

// 할 일 목록 수정
todoRouter.patch(
  "/todolists/:todoId",
  todoValidator.updateTodoListValidator,
  tokenMiddleware,
  TodoController.updateTodoList
);

export { todoRouter };
