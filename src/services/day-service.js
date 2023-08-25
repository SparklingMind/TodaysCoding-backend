import { dayModel } from "../db/models/day-model.js";
import moment from "moment";

const DayService = {
  async updateEmogi(userInfo, emogi) {
    const result = await dayModel.updateEmogiOrCreateDay(userInfo, emogi);
    return result;
  },

  async getFilteredDayImogi(dayInfo) {
    const { userId, startDate, endDate } = dayInfo;

    const allImgoies = await dayModel.findAllDay({ userId });

    const processedStartDate = moment(startDate);
    const processedEndDate = moment(endDate);

    const filteredImogies = allImgoies.filter(
      (day) =>
        moment(day.date).isSameOrAfter(processedStartDate) &&
        moment(day.date).isSameOrBefore(processedEndDate)
    );

    return filteredImogies;
  },
};

export { DayService };
