import { Router } from "express";
import { TodoController } from "../controllers/todo-controller.js";

const todoRouter = Router();

// 할 일 그룹(제목) 추가
todoRouter.post("/todo", TodoController.createTodo);
// 할 일 제목 수정
todoRouter.patch("/todo/:id", TodoController.updateTodo);
// 할 일 제목 삭제
todoRouter.delete("/todo/:id", TodoController.deleteTodo);
// 할 일 수정
todoRouter.patch("/todolist/:id", TodoController.updateTodolist);

export { todoRouter };
