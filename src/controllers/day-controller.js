import { DayService } from "../services/day-service.js";
import { PostService } from "../services/post-service.js";
import { TodoService } from "../services/todo-service.js";
import { dayModel } from "../db/models/day-model.js";
import { userModel } from "../db/models/user-model.js";

const DayController = {
  async getDayInfo(req, res, next) {
    try {
      const { userId } = req.params;
      const { date } = req.query;

      const day = await dayModel.findOrCreateDay({ userId, date });
      const dateId = day._id;

      const posts = await PostService.findPostsByIdAndDate({
        userId,
        dateId,
      });

      const todos = await TodoService.findTodoByUserIdAndDate({
        userId,
        dateId,
      });

      return res.status(200).json({
        posts,
        todos,
      });
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },

  async addEmogi(req, res, next) {
    try {
      const { userId } = req.params;
      const { date, emogi } = req.body;

      const result = await DayService.updateEmogi({ userId, date }, { emogi });

      if (!result) res.status(400).json({ errorMessage: error.message });

      res.status(201).json({
        date: result.date,
        emogi: result.emogi,
      });
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },
};

export { DayController };
