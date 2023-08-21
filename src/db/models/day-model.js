import { model } from "mongoose";
import { daySchema } from "../schemas/day-schema.js";

const Day = model("days", daySchema);

class DayModel {
  // 각 날짜에 이모지를 추가하거나 날짜가 없으면 날짜 데이터 생성 후 이모지 추가
  async updateEmogiOrCreateDay(userInfo, emogi) {
    const day = await Day.findOne(userInfo);
    if (!day) {
      const newDay = await Day.create({ ...userInfo, ...emogi });
      return newDay;
    }
    const result = await Day.findByIdAndUpdate(day._id, emogi);
    return result;
  }

  async findOrCreateDay(info) {
    const result = await Day.findOne(info);
    if (!result) {
      const newDay = await Day.create(info);
      return newDay;
    }
    return result;
  }
}

const dayModel = new DayModel();

export { dayModel };
