import { todoModel } from "../db/models/todo-model.js";
import { dayModel } from "../db/models/day-model.js";

const TodoService = {
  async addTodo(info) {
    const { id, date, title } = info;

    const day = await dayModel.find({ id, date });
    console.log(day);
    const dateId = day._id;

    const result = await todoModel.create({
      userId: id,
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
