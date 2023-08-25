import { todoModel } from "../db/models/todo-model.js";
import { dayModel } from "../db/models/day-model.js";
import { userModel } from "../db/models/user-model.js";

const TodoService = {
  async addTodo(todoId, todos) {
    const result = await todoModel.updateTodos({
      todoId,
      todos,
    });

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
  // async addTodo(info) {
  //   const { userId, date, name } = info;

  //   const day = await dayModel.findOrCreateDay({ userId, date });
  //   const dateId = day._id;

  //   const result = await todoModel.create({
  //     userId,
  //     dateId,
  //     name,
  //   });
  //   return result;
  // },
};

export { TodoService };
