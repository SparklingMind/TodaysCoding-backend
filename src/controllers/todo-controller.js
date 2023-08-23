import { TodoService } from "../services/todo-service.js";
import { todoModel } from "../db/models/todo-model.js";
import { dayModel } from "../db/models/day-model.js";
import { ObjectId } from "mongodb";
import cron from "node-cron";
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
      res.json({ errorMessage: error.message });
    }
  },

  // 할 일 제목 수정
  async updateTodo(req, res, next) {
    try {
      const { id } = req.params;
      const title = req.body.title;

      const result = await TodoService.changeTitle({ id, title });

      res.status(200).json(result);
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },

  // 할 일 제목 삭제
  async deleteTodo(req, res, next) {
    try {
      const id = req.params.categoryId;
      const result = await TodoService.removeTodo(id);

      res.status(200).json(result);
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },

  // 할 일 목록 수정
  async updateTodolist(req, res, next) {
    try {
      const id = req.params.categoryId;
      const todos = req.body;
      const result = await todoModel.addTodoList(id, [...todos]);
      res.status(200).json(result);
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },
};

async function getDateId() {
  const userId = `64dc7b9760546cac850f720b`;
  const today = moment().format("YYYYMMDD");
  const yesterday = moment().subtract(1, "d").format("YYYYMMDD");

  const todayData = await dayModel.findOrCreateDay({ userId, date: today });
  const yesterdayData = await dayModel.findOrCreateDay({
    userId,
    date: yesterday,
  });

  const todayId = todayData._id;
  const yesterdayId = yesterdayData._id;

  const yesterdayTodo = todoModel.console.log();
  console.log(todayId);
  console.log(yesterdayId);
  console.log();
}

const task = cron.schedule(
  "* * * * * *",
  function () {
    getDateId();
  },
  { scheduled: false }
);

// task.start();

export { TodoController };
