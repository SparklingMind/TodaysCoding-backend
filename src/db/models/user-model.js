import { model } from "mongoose";
import { userSchema } from "../schemas/user-schema.js";

const User = model("users", userSchema);

class UserModel {
  // DB에 유저 추가
  async create(userInfo) {
    const result = await User.create(userInfo);
    return result;
  }

  // userId로 user 찾기
  async findByUserId(id) {
    const result = await User.findOne(id);
    return result;
  }

  async findById(id) {
    const result = await User.findById(id);
    return result;
  }

  // id로 user 찾고 삭제
  async deleteById(id) {
    const result = await User.findByIdAndDelete(id);
    return result;
  }

  async update(_id, toUpdate) {
    const updateInfo = await User.findByIdAndUpdate(_id, toUpdate, {
      returnOriginal: false,
    });
    return updateInfo;
  }
}

const userModel = new UserModel();

export { userModel };
