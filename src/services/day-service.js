import { dayModel } from "../db/models/day-model.js";

const DayService = {
  async updateEmogi(userInfo, emogi) {
    const result = await dayModel.updateEmogiOrCreateDay(userInfo, emogi);
    return result;
  },
};

export { DayService };
