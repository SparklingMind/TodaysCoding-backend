import { Router } from "express";
import { DayController } from "../controllers/day-controller.js";
import { dayValidator } from "../middlewares/validators/day-validator.js";
import { tokenMiddleware } from "../middlewares/token-middleware.js";

const dayRouter = Router();

// 날짜에 해당하는 todo, post 조회
dayRouter.get("/days", tokenMiddleware, DayController.getDayInfo);
// 이모지 추가
dayRouter.patch(
  "/days",
  // dayValidator.addEmogiValidator,
  tokenMiddleware,
  DayController.addEmogi
);

export { dayRouter };
