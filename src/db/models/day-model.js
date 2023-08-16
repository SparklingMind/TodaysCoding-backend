import { model } from "mongoose";
import { daySchema } from "../schemas/day-schema.js";

const Day = model("days", daySchema);

class DayModel {
  // 각 날짜에 이모지를 추가하거나 날짜가 없으면 날짜 데이터 생성 후 이모지 추가
  async updateEmogiOrCreateDay(userInfo, emogi) {
    const result = await Day.findOneAndUpdate(userInfo, emogi, {
      upsert: true,
    });
    return result;
  }
}

const dayModel = new DayModel();

export { dayModel };
