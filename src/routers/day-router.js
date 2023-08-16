import { Router } from "express";
import { DayController } from "../controllers/day-controller";

const dayRouter = Router();

// 날짜에 해당하는 todo, post 조회
dayRouter.get("/day", getDayInfo);
// 이모지 추가
dayRouter.post("/day", addEmogi);

export { dayRouter };
