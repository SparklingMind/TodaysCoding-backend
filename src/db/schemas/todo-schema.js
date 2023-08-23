import { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    // todo 이름
    name: {
      type: String,
      required: true,
    },
    // 할 일 목록
    todos: {
      type: [{ completed: Boolean, text: String, originalIndex: Number }],
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    dateId: {
      type: Schema.Types.ObjectId,
      ref: "dates",
      required: true,
    },
  },
  {
    collection: "todos",
    timestamps: true,
  }
);

export { todoSchema };
