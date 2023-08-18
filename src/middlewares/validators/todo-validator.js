import Joi from "joi";

const todoValidator = {
  async createTitleValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      id: Joi.string().alphanum().min(3).max(30).required(),
      date: Joi.string()
        .pattern(new RegExp("\\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])"))
        .required(),
      title: Joi.string().max(20),
    });
    try {
      await schema.validateAsync(body);
    } catch (error) {
      res.status(400).json({ code: 400, errorMessage: error.message });
    }
    next();
  },

  async updateTitleValidator(req, res, next) {
    const body = req.body;
    const params = req.params;
    const bodySchema = Joi.object({
      title: Joi.string().max(20),
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

  async updateTodoListValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.array().items(
      Joi.object({
        todo: Joi.string().required(),
        completed: Joi.boolean().required(),
        originalIndex: Joi.number().required(),
      })
    );
    try {
      await schema.validateAsync(body);
    } catch (error) {
      res.status(400).json({ code: 400, errorMessage: error.message });
    }
    next();
  },
};

export { todoValidator };
