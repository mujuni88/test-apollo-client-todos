import React from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";

const ADD_CATEGORY = gql`
  mutation AddCategory($label: String!) {
    addCategory(label: $label) @client {
      id
    }
  }
`;

export default function CategoryForm(props) {
  const [addCategory] = useMutation(ADD_CATEGORY);
  const [input, setInput] = React.useState();
  return (
    <Container>
      <h1>Categories</h1>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          addCategory({ variables: { label: input } });
          e.target.value = "";
        }}
      >
        <input onChange={(e) => setInput(e.target.value)} />
        <button>Add</button>
      </StyledForm>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & h1 {
    font-size: 5rem;
  }
  & input {
    border: 1px solid rebeccapurple;
    font-size: 1.3rem;
    border-radius: 4px;
    padding: 1rem;
  }
  & button {
    padding: 1.3rem;
    background: rebeccapurple;
    color: white;
    border-radius: 4px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
`;
