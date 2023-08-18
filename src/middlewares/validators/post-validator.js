import Joi from "joi";

const postValidator = {
  async createPostValidator(req, res, next) {
    const body = req.body;
    const bodySchema = Joi.object({
      date: Joi.string()
        .pattern(new RegExp("\\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])"))
        .required(),
      title: Joi.string().required(),
      content: Joi.string(),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().alphanum().required(),
    });
    try {
      await bodySchema.validateAsync(body);
    } catch (error) {
      res.status(400).json({ code: 400, errorMessage: error.message });
    }
    next();
  },

  async updatePostValidator(req, res, next) {
    const body = req.body;
    const params = req.params;
    const bodySchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string(),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().alphanum().required(),
    });
    try {
      await bodySchema.validateAsync(body);
      await paramsSchema.validateAsync(params);
    } catch (error) {
      res.status(400).json({ code: 400, errorMessage: error.message });
    }
    next();
  },
};

export { postValidator };
