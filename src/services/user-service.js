import { userModel } from "../db/models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const UserService = {
  // 비밀번호만 암호화하여 DB에 회원 추가
  async addUser(userInfo) {
    const { name, id, email, password } = userInfo;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      name,
      id,
      email,
      password: hashedPassword,
    });

    return {
      success: !!result,
      name: result.name,
      id: result.id,
      email: result.email,
    };
  },

  async checkUser(userInfo) {
    const { id, password } = userInfo;

    const user = await userModel.findByUserId({ id });

    if (!user) {
      throw new Error("아이디 확인 필요");
    }

    const hashedPassword = user.password;
    const checkPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkPassword) {
      throw new Error("비밀번호 확인 필요");
    }

    const key = process.env.KEY;
    const token = jwt.sign({ id: user._id }, key);

    return { token, _id: user._id };
  },

  async updateUserInfo(_id, toUpdate) {
    if (toUpdate.password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      toUpdate.password = hashedPassword;
    }

    const checkUpdate = await userModel.update(_id, toUpdate);

    return checkUpdate;
  },
};

export { UserService };
