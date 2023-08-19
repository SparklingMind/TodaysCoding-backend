import { TodoService } from "../services/todo-service.js";
import { todoModel } from "../db/models/todo-model.js";
import { ObjectId } from "mongodb";

const TodoController = {
  // 할일 그룹(제목) 추가
  async createTodo(req, res, next) {
    try {
      const id = new ObjectId(req.params.userId);
      const { date, title } = req.body;
      const result = await TodoService.addTodo({
        id,
        date,
        title,
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  // 할 일 제목 수정
  async updateTodo(req, res, next) {
    try {
      const id = req.params.categoryId;
      const title = req.body.title;

      const result = await TodoService.changeTitle({ id, title });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // 할 일 제목 삭제
  async deleteTodo(req, res, next) {
    try {
      const id = req.params.categoryId;
      const result = await TodoService.removeTodo(id);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // 할 일 목록 수정
  async updateTodolist(req, res, next) {
    try {
      const id = req.params.categoryId;
      const todos = req.body;
      const result = await todoModel.addTodoList(id, { todos });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

export { TodoController };
