import { Router } from "express";
import { DayController } from "../controllers/day-controller.js";
import { dayValidator } from "../middlewares/validators/day-validator.js";

const dayRouter = Router();

// 날짜에 해당하는 todo, post 조회
dayRouter.get("/day", DayController.getDayInfo);
// 이모지 추가
dayRouter.patch(
  "/day/:id",
  dayValidator.addEmogiValidator,
  DayController.addEmogi
);

export { dayRouter };
