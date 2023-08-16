import cors from "cors";
import express from "express";

import { userRouter } from "./routers/user-router.js";
import { categoryRouter } from "./routers/category-router.js";
import { productRouter } from "./routers/product-router.js";
import { orderRouter } from "./routers/order-router.js";

const app = express();

app.use(cors());

// 프론트에서 json 파일을 보내면, req.body에 자동으로 객체 형태로 데이터가 들어가도록 함.
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", todoRouter);
app.use("/api", postRouter);
app.use("/api", dayRouter);

export { app };
