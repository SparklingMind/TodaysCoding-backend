import { model } from "mongoose";
import { todoSchema } from "../schemas/todo-schema.js";

const Todo = model("todos", todoSchema);

class TodoModel {
  async find(info) {
    const { userId, dateId } = info;
    const result = await Todo.find(info);
    return result;
  }

  async create(todoInfo) {
    const result = await Todo.create(todoInfo);
    return result;
  }

  async updateTitle(titleInfo) {
    const { id, title } = titleInfo;
    const result = await Todo.findByIdAndUpdate(
      id,
      { title },
      { returnOriginal: false }
    );
    return result;
  }

  async deleteTodo(id) {
    const result = await Todo.findByIdAndDelete(id);
    return result;
  }

  async addTodoList(id, todos) {
    const result = await Todo.findByIdAndUpdate(id, todos, {
      returnOriginal: false,
    });
    return result;
  }
}

const todoModel = new TodoModel();

export { todoModel };
