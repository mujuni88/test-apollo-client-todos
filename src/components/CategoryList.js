import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

import Category from "./Category";

const GET_CATEGORIES = gql`
  query GetCategories {
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

export default function CategoryList(props) {
  const { data = {}, error, loading } = useQuery(GET_CATEGORIES);

  if (error) return <h1>Error...</h1>;
  if (loading) return <h1>loading...</h1>;

  const { categories = [] } = data;
  return (
    <Container>
      {categories.map((category) => {
        const { id } = category;
        return <Category key={id} {...category} />;
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  height: auto;
`;

export { GET_CATEGORIES };
