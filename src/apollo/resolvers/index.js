import { gql } from "@apollo/client";
import { omit } from "lodash";
import { data } from '../../mock'

let nextTodoId = data.todos.length + 1;
let nextCategoryId = data.categories.length + 1;

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
      const newTodo = {
        __typename: "Todo",
        id: nextTodoId++,
        text,
        isCompleted: false,
        categories: []
      };

      cache.updateQuery(
        { query: todosQuery },
        ({ todos }) => ({ todos: [...todos, newTodo] })
      );

      return newTodo;
    },
    removeTodo: (obj, { id }, { cache }) => {
      cache.updateQuery(({ query: todosQuery }), ({ todos }) => ({
        todos: todos.filter(t => t.id !== id)
      }))

      return null
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
      const newCategory = {
        __typename: "Category",
        id: nextCategoryId++,
        label: vars.label,
        todos: []
      };

      cache.updateQuery({ query: categoriesQuery }, ({ categories }) => ({
        categories: [...categories, newCategory]
      }))

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

      const currentTodos = cache.readQuery({ query: todosQuery });
      const newTodos = currentTodos.todos.filter(td => input.todos.some((t) => t.id === td.id))

      const toUpdateCategory = currentCategories.categories.find((category) => {
        return category.id === input.id;
      });

      const updatedCategory = {
        ...toUpdateCategory,
        ...omit(input, "todos"),
        todos: toUpdateCategory.todos.concat(newTodos)
      };

      console.log({ updatedCategory })

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
