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
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    dateId: {
      type: Schema.Types.ObjectId,
      ref: "dates",
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { todoSchema };
