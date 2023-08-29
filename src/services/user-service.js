import { userModel } from "../db/models/user-model.js";
import { tokenModel } from "../db/models/token-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { issueToken } from "../modules/token-modules.js";

const UserService = {
  // 비밀번호만 암호화하여 DB에 회원 추가
  async addUser(userInfo) {
    const { name, id, email, password, nickname, aboutMe, birthDate, gender } =
      userInfo;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      name,
      id,
      email,
      password: hashedPassword,
      nickname,
      aboutMe,
      birthDate,
      gender,
    });

    return {
      success: !!result,
      name: result.name,
      id: result.id,
      email: result.email,
      nickname: result.nickname,
      aboutMe: result.aboutMe,
      birthDate: result.birthDate,
      gender: result.gender,
      profileImgUrl: result.profileIgUrl,
    };
  },

  async giveToken(userInfo) {
    const { id, password } = userInfo;

    const user = await userModel.findByUserId({ id });

    if (!user) {
      throw new Error("check id");
    }

    const hashedPassword = user.password;
    const checkPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkPassword) {
      throw new Error("check password");
    }

    // token 생성
    const _id = user._id;
    const { accessToken, refreshToken } = await issueToken(_id);

    // refreshToken DB에 저장
    // const tokenData = await tokenModel.findById(_id);

    // if (!tokenData) {
    //   await tokenModel.createToken({
    //     id: _id,
    //     refreshToken,
    //   });
    // }
    // const result = await tokenModel.updateToken({ _id, refreshToken });

    return { accessToken };
  },

  async updateUserInfo(_id, toUpdate) {
    if (toUpdate.password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      toUpdate.password = hashedPassword;
    }

    const result = await userModel.update(_id, toUpdate);

    return {
      name: result.name,
      id: result.id,
      email: result.email,
      nickname: result.nickname,
      aboutMe: result.aboutMe,
      birthDate: result.birthDate,
      gender: result.gender,
      profileImgUrl: result.profileImgUrl,
    };
  },
};

export { UserService };
