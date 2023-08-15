import { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    // todo 제목
    title: {
      type: String,
      required: true,
    },
    // 할 일 목록
    todos: {
      type: [{ checked: Boolean, todo: String }],
      required: false,
    },
    // 한국시간 넣어야 함
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { todoSchema };
