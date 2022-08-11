import { gql } from "@apollo/client";
import { normalizedCache } from '../../mock'

const ROOT_QUERY = normalizedCache['ROOT_QUERY'];
let nextTodoId = ROOT_QUERY['todos'].length;
let nextCategoryId = ROOT_QUERY['categories'].length;

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
        id: ++nextTodoId,
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
      cache.modify({
        fields: {
          todos(prevTodos, { readField }) {
            return prevTodos.filter(todoRef => readField('id', todoRef) !== id)
          }
        }
      })

      /*
        // removes the item from cache entirely
        cache.evict({ id: `Todo:${id}` })
        cache.gc();
      */

      return { id }
    },
    toggleTodo: (obj, { id }, { cache }) => {
      cache.modify({
        id: `Todo:${id}`,
        fields: {
          isCompleted(prevIsCompleted) {
            return !prevIsCompleted
          }
        }
      })

      return { id };
    },
    addCategory: (obj, { label }, { cache }) => {
      const newCategory = {
        __typename: "Category",
        id: ++nextCategoryId,
        label,
        todos: []
      };

      cache.updateQuery({ query: categoriesQuery }, ({ categories }) => ({
        categories: [...categories, newCategory]
      }))

      return newCategory;
    },
    removeCategory: (obj, { id }, { cache }) => {
      cache.modify({
        fields: {
          categories(prevCategories, { readField }) {
            return prevCategories.filter(categoryRef => readField('id', categoryRef) !== id)
          }
        }
      })

      /*
        // removes the item from cache entirely
        cache.evict({ id: `Category:${id}` })
        cache.gc();
      */

      return { id };
    },
    updateCategory: (obj, { input }, { cache }) => {
      let updatedCategory;
      cache.updateFragment({
        id: `Category:${input.id}`,
        fragment: gql`
          fragment _ on Category {
            id
            label
            todos {
              id
            }
          } 
        `
      }, (data) => {
        updatedCategory = { ...data, ...input }
        return updatedCategory;
      })

      return updatedCategory;
    }
  }
};
