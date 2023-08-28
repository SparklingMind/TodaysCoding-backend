import { DayService } from "../services/day-service.js";
import { PostService } from "../services/post-service.js";
import { TodoService } from "../services/todo-service.js";
import { dayModel } from "../db/models/day-model.js";

const DayController = {
  async getDayImogi(req, res, next) {
    try {
      const { userId } = req.params;
      const { startDate, endDate } = req.query;

      const result = await DayService.getFilteredDayImogi({
        userId,
        startDate,
        endDate,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.json({ errorMessage: error.message });
    }
  },
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

      const todos = await TodoService.findTodoByCategoryId({
        userId,
        dateId,
      });

      return res.status(200).json({
        posts,
        todos,
      });
    } catch (error) {
      return res.json({ errorMessage: error.message });
    }
  },

  async addEmogi(req, res, next) {
    try {
      const { userId } = req.params;
      const { date, emogi } = req.body;

      const result = await DayService.updateEmogi({ userId, date }, { emogi });

      if (!result) {
        return res.status(400).json({ errorMessage: error.message });
      }

      return res.status(201).json({
        date: result.date,
        emogi: result.emogi,
      });
    } catch (error) {
      return res.status(400).json({});
    }
  },
};

export { DayController };
