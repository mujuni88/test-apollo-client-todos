import { gql } from "@apollo/client";
import { omit } from "lodash";

let nextTodoId = 0;
let nextCategoryId = 0;

const todosQuery = gql`
  query GetTodos {
    todos @client {
      id
      text
      isCompleted
      categories {
        id
        label
      }
    }
  }
`;

const categoriesQuery = gql`
  query GetTodos {
    categories @client {
      id
      label
      todos {
        id
        text
      }
    }
  }
`;

export default {
  Mutation: {
    addTodo: (obj, { text }, { cache }) => {
      const previousState = cache.readQuery({ query: todosQuery });

      const newTodo = {
        __typename: "TodoItem",
        id: nextTodoId++,
        text,
        isCompleted: false,
        categories: []
      };

      const data = {
        todos: previousState.todos.concat([newTodo])
      };

      cache.writeData({ data });
      return newTodo;
    },
    removeTodo: (obj, { id }, { cache }) => {
      const currentTodos = cache.readQuery({ query: todosQuery });

      const removedTodoArr = currentTodos.todos.filter((todo) => {
        return todo.id !== id;
      });

      const data = {
        todos: removedTodoArr
      };

      cache.writeData({ data });

      return null;
    },
    toggleTodo: (obj, { id: todoId }, { cache }) => {
      const id = `TodoItem:${todoId}`;

      const fragment = gql`
        fragment completeTodo on TodoItem {
          isCompleted
        }
      `;

      const todo = cache.readFragment({ fragment, id });

      const data = { ...todo, isCompleted: !todo.isCompleted };

      cache.writeData({ id, data });

      return null;
    },
    addCategory: (obj, vars, { cache }) => {
      const previousState = cache.readQuery({ query: categoriesQuery });

      const newCategory = {
        __typename: "Category",
        id: nextCategoryId++,
        label: vars.label,
        todos: []
      };

      const data = {
        categories: previousState.categories.concat([newCategory])
      };

      cache.writeData({ data });
      return newCategory;
    },
    removeCategory: (obj, { id }, { cache }) => {
      const currentCategories = cache.readQuery({ query: categoriesQuery });

      const categories = currentCategories.categories.filter((category) => {
        return category.id !== id;
      });

      const data = {
        categories
      };

      cache.writeData({ data });

      return null;
    },
    updateCategory: (obj, { input }, { cache }) => {
      const currentCategories = cache.readQuery({ query: categoriesQuery });

      const toUpdateCategory = currentCategories.categories.filter(
        (category) => {
          return category.id !== input.id;
        }
      );

      const updatedCategory = {
        ...toUpdateCategory,
        ...omit(input, "todos"),
        todos: toUpdateCategory.todos.concat(input.todos)
      };

      const data = {
        categories: currentCategories.categories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        )
      };

      cache.writeData({ data });
      return updatedCategory;
    }
  }
};
