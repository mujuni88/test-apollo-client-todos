import React from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import Todo from "./Todo";

const REMOVE_CATEGORY = gql`
  mutation removeCategory($id: ID!) {
    removeCategory(id: $id) @client
  }
`;

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: CategoryInput!) {
    updateCategory(input: $input) @client
  }
`;
export default function Category(props) {
  const { id, label, todos = [] } = props;

  const [updateCategory, { loading, error }] = useMutation(UPDATE_CATEGORY, {
    update: (cache, { data }) => {
      console.log("UPDATE", data)
      // TODO update todos
      // Add category in the todos returned

      // Loop through the todos returned and add the category id
      const todo = data.updateCategory.todos[0]
      /*       cache.modify({
              id: cache.identify(todo),
              fields: {
                categories: (prev, { readField }) => {
                  console.log({ prev })
                  return prev;
                }
              }
            }) */
      cache.modify({
        id: `Category:1`,
        fields: {
          todos: (prev, { readField }) => {
            console.log({ prev })
            return prev;
          }
        }
      })
    }
  });

  const addTodo = () => {
    const input = { id, todos: [{ id: 2, __typename: 'Todo' }, { id: 3, __typename: 'Todo' }] };
    updateCategory({ variables: { input } })
  }

  if (error) { console.error(error) }

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
          <button disabled={loading} onClick={addTodo}> + Add</button>
        </Header>
        {todos.map((todo) => {
          const { id } = todo;
          return <Todo key={id} {...todo} />;
        })}
      </ListContainer>
    </Wrapper >
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
