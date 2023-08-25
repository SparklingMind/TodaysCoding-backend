import { Router } from "express";
import { TodoController } from "../controllers/todo-controller.js";
import { todoValidator } from "../middlewares/validators/todo-validator.js";
import { tokenMiddleware } from "../middlewares/token-middleware.js";

const todoRouter = Router();

// 해당 아이디가 만든 todo들 모두 조회
todoRouter.get("/todos", tokenMiddleware, TodoController.getTodo);

// 할 일 그룹(제목) 추가
// todoRouter.post(
//   "/todos",
//   todoValidator.createNameValidator,
//   tokenMiddleware,
//   TodoController.createTodo
// );
// 할 일 제목 수정
// todoRouter.patch(
//   "/todos/:categoryId",
//   todoValidator.updateNameValidator,
//   tokenMiddleware,
//   TodoController.updateTodo
// );
// 할 일 제목 삭제
// todoRouter.delete(
//   "/todos/:categoryId",
//   tokenMiddleware,
//   TodoController.deleteTodo
// );
// 할 일 목록 수정
todoRouter.patch(
  "/todolists/:todoId",
  todoValidator.updateTodoListValidator,
  tokenMiddleware,
  TodoController.updateTodoList
);

export { todoRouter };
