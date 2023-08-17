import { DayService } from "../services/day-service.js";
import { userModel } from "../db/models/user-model.js";

const DayController = {
  async getDayInfo(req, res, next) {
    try {
    } catch {}
  },

  async addEmogi(req, res, next) {
    try {
      const { id, date, emogi } = req.body;

      const result = await DayService.updateEmogi({ id, date }, { emogi });

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
