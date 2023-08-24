import { TodoService } from "../services/todo-service.js";
import { todoModel } from "../db/models/todo-model.js";
import { dayModel } from "../db/models/day-model.js";
import { ObjectId } from "mongodb";
import cron from "node-cron";
import { deliverTodo } from "../modules/todo-modules.js";
import moment from "moment";

const TodoController = {
  // 할일 아이디와 날짜 별로 초회
  async getTodo(req, res, next) {
    try {
      const { userId } = req.params;
      const { date } = req.query;

      const day = await dayModel.findOrCreateDay({ userId, date });
      const dateId = day._id;

      const result = await TodoService.findTodoByUserIdAndDate({
        userId,
        dateId,
      });

      res.status(200).json(result);
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },

  // 할일 그룹(이름) 추가
  async createTodo(req, res, next) {
    try {
      const userId = new ObjectId(req.params.userId);
      const { date, name } = req.body;
      const result = await TodoService.addTodo({
        userId,
        date,
        name,
      });

      res.status(201).json(result);
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },

  // 할 일 이름 수정
  async updateTodo(req, res, next) {
    try {
      const id = req.params.categoryId;
      const name = req.body.name;

      const result = await TodoService.changeName({ id, name });

      if (result === null) {
        return res
          .status(400)
          .json({ message: "해당 todo 목록이 더 이상 존재하지 않습니다." });
      }

      res.status(200).json(result);
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },

  // 할 일 이름 삭제
  async deleteTodo(req, res, next) {
    try {
      const id = req.params.categoryId;
      const result = await TodoService.removeTodo(id);

      if (result === null) {
        return res
          .status(400)
          .json({ message: "해당 todo 목록이 더 이상 존재하지 않습니다." });
      }

      res.status(204).json(result);
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },

  // 할 일 목록 수정
  async updateTodolist(req, res, next) {
    try {
      const id = req.params.categoryId;
      const todos = req.body;
      console.log([...todos]);
      const result = await todoModel.addTodoList(id, [...todos]);

      if (result === null) {
        return res
          .status(400)
          .json({ message: "해당 todo 목록이 더 이상 존재하지 않습니다." });
      }

      res.status(200).json(result);
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },
};

// const task = cron.schedule(
//   "*/2 * * * * *",
//   function () {
//     deliverTodo();
//   },
//   { scheduled: false }
// );

// task.start();

export { TodoController };
