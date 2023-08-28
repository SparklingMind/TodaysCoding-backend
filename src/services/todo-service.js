import { todoModel } from "../db/models/todo-model.js";
import { dayModel } from "../db/models/day-model.js";
import { userModel } from "../db/models/user-model.js";

const TodoService = {
  async addTodo(todoInfo) {
    const { userId, dateId, categoryNameId, completed, text, originalIndex } =
      todoInfo;
    const result = await todoModel.create(todoInfo);

    return result;
  },

  async findTodoByCategoryId(todoInfo) {
    const { userId, dateId } = todoInfo;
    const result = await todoModel.findByUserAndDateId(todoInfo);
    return result;
  },

  async findTodoByUserIdAndDate(info) {
    const { userId, dateId } = info;
    const posts = await todoModel.find({ userId, dateId });
    return posts;
  },

  async changeName(info) {
    const { id, name } = info;

    const result = await todoModel.updateName(info);
    return result;
  },

  async removeTodo(id) {
    const result = await todoModel.deleteTodo(id);
    return result;
  },
};

export { TodoService };
