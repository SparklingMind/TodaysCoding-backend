import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(cors());

// 프론트에서 json 파일을 보내면, req.body에 자동으로 객체 형태로 데이터가 들어가도록 함.
app.use(express.json());

export { app };
