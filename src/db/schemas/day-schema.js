import { Schema } from "mongoose";

const daySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    // 이거 date 타입으로 하는게 좋은가? string으로 해도 되나?
    // 동작에는 문제 없을 것 같은데
    date: {
      type: Date,
      required: true,
    },
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
