import { model } from "mongoose";
import { todoSchema } from "../schemas/todo-schema.js";
import { userModel } from "./user-model.js";

import { ObjectId } from "mongodb";

const Todo = model("todos", todoSchema);

class TodoModel {
  async find(info) {
    const { userId, dateId } = info;
    const result = await Todo.find(info);
    return result;
  }

  async create(todoInfo) {
    const { userId, dateId, categoryNameId, completed, text, originalIndex } =
      todoInfo;
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
    const userId = new ObjectId(todoInfo.userId);
    const user = await userModel.findById(userId);
    const categories = user.categoryName;

    const allcategories = categories.map((cat) => {
      return { categoryName: cat._id, categoryId: cat._id };
    });

    const todos = await Todo.find(todoInfo);

    console.log(todos);

    allcategories.map((category) => {
      todos.forEach((todo) => {
        if (
          todo.categoryNameId.toString() === category.categoryName.toString()
        ) {
          category.todos = todo.todos;
          category.todoId = todo._id;
        }
      });
    });

    allcategories.map((todo) => {
      categories.forEach((category) => {
        if (todo.categoryName.toString() === category._id.toString()) {
          todo.categoryName = category.name;
        }
      });
    });

    console.log("allcategories: ", allcategories);

    return allcategories;
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
