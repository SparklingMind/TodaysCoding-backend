import { Schema } from "mongoose";

const postSchema = new Schema(
  {
    // post 제목
    title: {
      type: String,
      required: true,
    },
    // 할 일 목록
    post: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.String,
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

export { postSchema };
