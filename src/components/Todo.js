import React from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import Category from "./Category";

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id) @client
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) @client
  }
`;

export default function Todo(props) {
  const { id, text, isCompleted, categories = [] } = props;

  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    variables: {
      id
    }
  });

  const [removeTodo] = useMutation(REMOVE_TODO, {
    variables: {
      id
    }
  });
  return (
    <Wrapper>
      <Container key={id}>
        <p
          style={{
            textDecoration: isCompleted ? "line-through" : "none"
          }}
        >
          {text}
        </p>
        <ButtonWrapper>
          <TodoButton onClick={() => toggleTodo()}>Complete</TodoButton>
          <TodoButton danger onClick={() => removeTodo()}>
            Delete
          </TodoButton>
        </ButtonWrapper>
      </Container>
      <ListContainer>
        <Header>
          <h3>Categories</h3>
          <button>+ Add</button>
        </Header>
        {categories.map((category) => {
          const { id } = category;
          return <Category key={id} {...category} />;
        })}
      </ListContainer>
    </Wrapper>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: auto;
  margin-top: 2rem;
  font-size: 1.3rem;
  border-radius: 4px;
  padding: 5px;
  & p {
    margin-right: 1rem;
  }
`;

const TodoButton = styled.button`
  background: ${(props) => (props.danger ? "#f90404" : "#5cc623")};
  padding: 1.2rem 1rem;
  border-radius: 4px;
  color: white;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid grey;
  margin-bottom: 10px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 10px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
`;
