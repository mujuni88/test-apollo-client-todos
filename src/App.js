import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";

import styled from "styled-components";

export default function App() {
  return (
    <Container>
      <Section>
        <TodoForm />
        <TodoList />
      </Section>
      <Section>
        <CategoryForm />
        <CategoryList />
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
