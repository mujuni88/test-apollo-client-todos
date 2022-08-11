import React from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import Todo from "./Todo";

const REMOVE_CATEGORY = gql`
  mutation removeCategory($id: ID!) {
    removeCategory(id: $id) @client
  }
`;

export default function Category(props) {
  const { id, label, todos } = props;

  const [removeCategory] = useMutation(REMOVE_CATEGORY, {
    variables: {
      id
    }
  });
  return (
    <Wrapper>
      <Container key={id}>
        <p>{label}</p>
        <div>
          <DeleteButton danger onClick={() => removeCategory()}>
            Delete
          </DeleteButton>
        </div>
      </Container>
      <ListContainer>
        <Header>
          <h3>Todos</h3>
          <button>+ Add</button>
        </Header>
        {todos.map((todo) => {
          const { id } = todo;
          return <Todo key={id} {...todo} />;
        })}
      </ListContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid grey;
  margin-bottom: 10px;
`;
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

const DeleteButton = styled.button`
  background: ${(props) => (props.danger ? "#f90404" : "#5cc623")};
  padding: 1.2rem 1rem;
  border-radius: 4px;
  color: white;
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
