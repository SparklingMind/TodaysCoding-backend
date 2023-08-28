import { dayModel } from "../db/models/day-model.js";
import moment from "moment";

const DayService = {
  async updateEmoji(userInfo, emoji) {
    const result = await dayModel.updateEmojiOrCreateDay(userInfo, emoji);
    return result;
  },

  async getFilteredDayEmoji(dayInfo) {
    const { userId, startDate, endDate } = dayInfo;

    const allImgoies = await dayModel.findAllDay({ userId });

    const processedStartDate = moment(startDate);
    const processedEndDate = moment(endDate);

    const filteredEmojies = allImgoies.filter(
      (day) =>
        moment(day.date).isSameOrAfter(processedStartDate) &&
        moment(day.date).isSameOrBefore(processedEndDate)
    );

    return filteredEmojies;
  },
};

export { DayService };
