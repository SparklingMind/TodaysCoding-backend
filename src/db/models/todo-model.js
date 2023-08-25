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
    const { userId, dateId, categoryNameId } = todoInfo;
    const result = await Todo.create(todoInfo);
    return result;
  }

  async deleteTodo(todoinfo) {
    const { userId, categoryNameId } = todoinfo;
    const result = await Todo.deleteMany(todoinfo);
    return result;
  }

  async updateTodos(todoInfo) {
    const { todoId, todos } = todoInfo;
    const result = await Todo.findByIdAndUpdate(
      todoId,
      { todos },
      { returnOriginal: false }
    );
    return result;
  }

  async findByUserAndDateId(todoInfo) {
    const result = await Todo.find(todoInfo).populate("categoryNameId");
    // .populate({ path: "", model: "users" });/
    return result;
  }

  // async oldCreate(todoInfo) {
  //   const result = await Todo.create(todoInfo);
  //   return result;
  // }

  // async updateName(nameInfo) {
  //   const { id, name } = nameInfo;
  //   const result = await Todo.findByIdAndUpdate(
  //     id,
  //     { name },
  //     { returnOriginal: false }
  //   );
  //   return result;
  // }

  // async OlddeleteTodo(id) {
  //   const result = await Todo.findByIdAndDelete(id);
  //   return result;
  // }

  // async addTodoList(id, todos) {
  //   const result = await Todo.findByIdAndUpdate(
  //     id,
  //     { todos },
  //     {
  //       returnOriginal: false,
  //     }
  //   );
  //   return result;
  // }
}

const todoModel = new TodoModel();

export { todoModel };
