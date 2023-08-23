import Joi from "joi";

const userValidator = {
  async loginValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      id: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().required(),
    });
    try {
      await schema.validateAsync(body);
      next();
    } catch (error) {
      res
        .status(400)
        .json({ code: "Bad Request", errorMessage: error.message });
    }
  },

  async registerValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      id: Joi.string().alphanum().min(3).max(30).required(),
      name: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().required(),
    });
    try {
      await schema.validateAsync(body);
      next();
    } catch (error) {
      res
        .status(400)
        .json({ code: "Bad Request", errorMessage: error.message });
    }
  },

  async updateUserValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      email: Joi.string().email(),
      id: Joi.string().alphanum().min(3).max(30),
      name: Joi.string().alphanum().min(3).max(30),
    });
    try {
      await schema.validateAsync(body);
      next();
    } catch (error) {
      res
        .status(400)
        .json({ code: "Bad Request", errorMessage: error.message });
    }
  },
};

export { userValidator };
