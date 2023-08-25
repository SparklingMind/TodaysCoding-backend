import { Schema } from "mongoose";

const categoryNameSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const userSchema = new Schema(
  {
    // 유저 이름
    name: {
      type: String,
      required: true,
    },
    // 유저 ID
    id: {
      type: String,
      unique: true,
      required: true,
    },
    // 유저 이메일
    email: {
      type: String,
      required: true,
    },
    // 유저 비밀번호 (해쉬)
    password: {
      type: String,
      required: true,
    },
    // 프로필 사진
    profileImageUrl: {
      type: String,
      required: false,
    },
    // admin 확인
    isAdmin: {
      type: Boolean,
      default: false,
    },
    categoryName: [categoryNameSchema],
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { userSchema };
