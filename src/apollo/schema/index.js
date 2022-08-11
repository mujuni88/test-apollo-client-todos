import { gql } from "@apollo/client";

const typeDefs = gql`
  input TodoInput {
    id: ID!
    text: String
    isCompleted: Boolean
    categories: [CategoryInput]
  }
  input CategoryInput {
    id: ID!
    label: String
    todos: [TodoInput]
  }

  type Category {
    id: ID!
    label: String!
    todos: [Todo]
  }
  type Todo {
    id: ID!
    text: String!
    isCompleted: Boolean
    categories: [Category]
  }
  type Mutation {
    addTodo(text: String!): Todo
    updateTodo(input: TodoInput): Todo
    toggleTodo(id: ID!): Todo
    removeTodo(id: ID!): Todo

    addCategory(label: String!): Category
    updateCategory(input: CategoryInput): Category
    removeCategory(id: ID!): Category
  }
  type Query {
    todos: [Todo]
    categories: [Category]
  }
`;

export default typeDefs;
