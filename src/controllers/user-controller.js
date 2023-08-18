import { UserService } from "../services/user-service.js";
import { userModel } from "../db/models/user-model.js";

const UserController = {
  // 회원 추가(회원가입)
  async createUser(req, res, next) {
    try {
      const { name, id, email, password } = req.body;
      const result = await UserService.addUser({ name, id, email, password });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  // 로그인(아이디, 비밀번호 확인)
  async login(req, res, next) {
    try {
      const { id, password } = req.body;
      const result = await UserService.checkUser({ id, password });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 조회(마이페이지)
  async getUser(req, res, next) {
    try {
      const userId = req.params;
      const result = await userModel.findById(userId);
      res.status(200).json({
        id: result.id,
        eamil: result.email,
        name: result.name,
      });
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 수정(마이페이지)
  async updateUser(req, res, next) {
    try {
      const userId = req.params;
      const { id, email, name, password } = req.body;

      const toUpdate = {
        ...(id && { id }),
        ...(email && { email }),
        ...(name && { name }),
        ...(password && { password }),
      };

      const checkUpdate = await UserService.updateUserInfo(userId, toUpdate);

      res.status(200).json({
        name: checkUpdate.name,
        id: checkUpdate.id,
        email: checkUpdate.email,
      });
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 삭제(회원탈퇴)
  async deleteUser(req, res, next) {
    try {
      const userId = req.params;
      const result = await userModel.deleteById(userId);
      res.status(200).json({
        success: !!result,
        id: result.id,
      });
    } catch (error) {
      next(error);
    }
  },
};

export { UserController };
