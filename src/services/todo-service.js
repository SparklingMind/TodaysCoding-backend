import { todoModel } from "../db/models/todo-model.js";
import { dayModel } from "../db/models/day-model.js";
import { userModel } from "../db/models/user-model.js";

const TodoService = {
  async addTodo(info) {
    const { id, date, title } = info;

    const day = await dayModel.findOrCreateDay({ userId: id, date });
    const user = await userModel.findById(id);
    const userId = user._id;
    const dateId = day._id;

    const result = await todoModel.create({
      userId,
      dateId,
      title,
    });
    return result;
  },

  async changeTitle(info) {
    const { id, title } = info;

    const result = await todoModel.updateTitle(info);
    return result;
  },

  async removeTodo(id) {
    const result = await todoModel.deleteTodo(id);
    return result;
  },
};

export { TodoService };
