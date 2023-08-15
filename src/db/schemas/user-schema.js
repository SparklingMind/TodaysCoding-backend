import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    // 유저 이름
    name: {
      type: String,
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
    // 로컬 Date 저장
    date: {
      type: String,
      required: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { userSchema };
