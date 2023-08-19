import { Router } from "express";
import { TodoController } from "../controllers/todo-controller.js";
import { todoValidator } from "../middlewares/validators/todo-validator.js";

const todoRouter = Router();

// 할 일 그룹(제목) 추가
todoRouter.post(
  "/todo/:userId",
  todoValidator.createTitleValidator,
  TodoController.createTodo
);
// 할 일 제목 수정
todoRouter.patch(
  "/todo/:categoryId",
  todoValidator.updateTitleValidator,
  TodoController.updateTodo
);
// 할 일 제목 삭제
todoRouter.delete("/todo/:categoryId", TodoController.deleteTodo);
// 할 일 수정
todoRouter.patch(
  "/todolist/:categoryId",
  todoValidator.updateTodoListValidator,
  TodoController.updateTodolist
);

export { todoRouter };
