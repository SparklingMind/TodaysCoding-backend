import { UserService } from "../services/user-service.js";
import { userModel } from "../db/models/user-model.js";
import { ObjectId } from "mongodb";

const UserController = {
  // 회원 추가(회원가입)
  async createUser(req, res, next) {
    try {
      const { name, id, email, password } = req.body;
      const result = await UserService.addUser({ name, id, email, password });
      res.status(201).json(result);
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },

  // 회원가입 아이디 중복 확인
  async checkDuplicationOfId(req, res, next) {
    try {
      const { loginId } = req.params;
      const result = await userModel.findByUserId({ id: loginId });

      res
        .status(200)
        .json(
          !result
            ? { message: "사용할 수 있는 아이디입니다." }
            : { message: "다른 아이디를 사용해주세요." }
        );
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },
  // 로그인(아이디, 비밀번호 확인)
  async login(req, res, next) {
    try {
      const { id, password } = req.body;
      const result = await UserService.checkUser({ id, password });
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.json({ errorMessage: error.message });
    }
  },

  // 사용자 정보 조회(마이페이지)
  async getUser(req, res, next) {
    try {
      const id = new ObjectId(req.params.userId);
      const result = await userModel.findById(id);
      res.status(200).json({
        id: result.id,
        email: result.email,
        name: result.name,
      });
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },

  // 사용자 정보 수정(마이페이지)
  async updateUser(req, res, next) {
    try {
      const _id = new ObjectId(req.params.userId);
      const { id, email, name, password } = req.body;

      const toUpdate = {
        ...(id && { id }),
        ...(email && { email }),
        ...(name && { name }),
        ...(password && { password }),
      };

      const checkUpdate = await UserService.updateUserInfo(_id, toUpdate);

      res.status(200).json({
        name: checkUpdate.name,
        id: checkUpdate.id,
        email: checkUpdate.email,
      });
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },

  // 사용자 정보 삭제(회원탈퇴)
  async deleteUser(req, res, next) {
    try {
      const _id = new ObjectId(req.params.userId);
      const result = await userModel.deleteById(_id);
      res.status(200).json({
        success: !!result,
        id: result.id,
        email: result.email,
        name: result.name,
      });
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },
};

export { UserController };
