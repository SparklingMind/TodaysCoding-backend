import { DayService } from "../services/day-service.js";
import { userModel } from "../db/models/user-model.js";

const DayController = {
  async getDayInfo(req, res, next) {
    try {
    } catch {}
  },

  async addEmogi(req, res, next) {
    try {
      const { userId } = req.params;
      const { date, emogi } = req.body;

      const result = await DayService.updateEmogi({ userId, date }, { emogi });

      res.status(201).json({
        date: result.date,
        emogi: result.emogi,
      });
    } catch (error) {
      next(error);
    }
  },
};

export { DayController };
