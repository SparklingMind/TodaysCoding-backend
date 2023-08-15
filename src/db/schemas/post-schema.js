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
    // 한국시간 넣어야 함
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { postSchema };
