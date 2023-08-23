import Joi from "joi";

const todoValidator = {
  async createNameValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      date: Joi.string()
        .pattern(new RegExp("\\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])"))
        .required(),
      name: Joi.string().max(20),
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

  async updateNameValidator(req, res, next) {
    const body = req.body;
    const params = req.params;
    const bodySchema = Joi.object({
      name: Joi.string().max(20),
    });
    const paramsSchema = Joi.object({
      categoryId: Joi.string().alphanum().required(),
    });
    try {
      await bodySchema.validateAsync(body);
      await paramsSchema.validateAsync(params);
      next();
    } catch (error) {
      res
        .status(400)
        .json({ code: "Bad Request", errorMessage: error.message });
    }
  },

  async updateTodoListValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.array().items(
      Joi.object({
        completed: Joi.boolean().required(),
        text: Joi.string().required(),
        originalIndex: Joi.number().required(),
      })
    );
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

export { todoValidator };
