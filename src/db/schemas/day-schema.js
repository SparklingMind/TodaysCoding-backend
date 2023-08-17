import { Schema } from "mongoose";

const daySchema = new Schema(
  {
    id: {
      type: Schema.Types.String,
      ref: "users",
    },
    // 날짜
    date: {
      type: Date,
      required: true,
    },
    // 해당 날짜에 저장되는 이모티콘
    emogi: {
      type: String,
      required: false,
    },
  },
  {
    collection: "dates",
    timestamps: true,
  }
);

export { daySchema };
