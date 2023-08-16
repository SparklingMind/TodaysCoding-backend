import { model } from "mongoose";
import { userSchema } from "../schemas/user-schema.js";

const User = model("users", userSchema);

class UserModel {
  // DB에 유저 추가
  async create(userInfo) {
    const result = await User.create(userInfo);
    return result;
  }

  // id로 user 찾기
  async findById(id) {
    const result = await User.findOne(id);
    return result;
  }

  // id로 user 찾고 삭제
  async deleteById(id) {
    const result = await User.findOneAndDelete(id);
    return result;
  }

  async update(userId, toUpdate) {
    const updateInfo = await User.findOneAndUpdate(userId, toUpdate, {
      returnOriginal: false,
    });
    console.log(updateInfo);
    return updateInfo;
  }
}

const userModel = new UserModel();

export { userModel };
