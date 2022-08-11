import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

import Todo from "./Todo";

const GET_TODO_LIST = gql`
  query GetTodoList {
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

export default function TodoList(props) {
  const { data = {}, error, loading } = useQuery(GET_TODO_LIST);

  if (error) return <h1>Error...</h1>;
  if (loading) return <h1>loading...</h1>;

  const { todos = [] } = data;
  return (
    <TodoListContainer>
      {todos.map((todo) => {
        const { id } = todo;
        return <Todo key={id} {...todo} />;
      })}
    </TodoListContainer>
  );
}

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  height: auto;
`;

export { GET_TODO_LIST };
