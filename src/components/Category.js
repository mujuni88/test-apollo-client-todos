import React from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import Todo from "./Todo";
import { isEmpty } from "lodash";

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
/*       const _cache = cache.extract();
      const toBeUpdatedTodosSet = new Set();
      const todoIdsSet = new Set(data.updateCategory.todos.map(td => td.id));

      for(const [, value] of Object.entries(_cache)){
        if(value.__typename === 'Todo' && !todoIdsSet.has(value.id)){
          toBeUpdatedTodosSet.add(cache.identify(value))
        }
      }
      
      console.log({toBeUpdatedTodosSet});

      Array.from(toBeUpdatedTodosSet).forEach((id) => {
        cache.modify({
          id,
          fields: {
            categories(prevCategories, {readField}){
              console.log({prevCategories})            
              return prevCategories.filter(category => readField('id', category) !== data.updateCategory.id)
            }
          }
        });
      })
    } */


      // METHOD 2: loops through all todos in the cache
      // CONS: hard to scale since it requires one to know the field
      // CONS: will loop through all entries of todos in the case the field takes arguments


      const responseTodoSet = new Set(data.updateCategory.todos.map(todo => todo.id))

      // Get all the todos we need to update
      const toBeUpdatedTodosSet = new Set();
      cache.modify({
        fields: {
          todos(todos, {readField}) {
            todos.forEach((todo) => {
              // check if todo already added 
              const key = cache.identify(todo);
              if(toBeUpdatedTodosSet.has(key)) return;

              // Check if todo already contains this category
              const categories = readField('categories', todo);
              const isCategoryInTodo = categories.some(catRef => readField('id', catRef) === data.updateCategory.id);

              if(isCategoryInTodo && responseTodoSet.has(readField('id', todo))) return;

              toBeUpdatedTodosSet.add(key);
            });
            return todos;
          },
        },
      });
      // Update categories of all the todos
      Array.from(toBeUpdatedTodosSet).forEach((id) => {
        cache.modify({
          id,
          fields: {
            categories(prevCategories, {readField}){
              return prevCategories.filter(category => readField('id', category) !== data.updateCategory.id)
            }
          }
        });
      })

  }});

  const addTodo = () => {
    const input = { id, todos: [{ id: 3, __typename: "Todo" }] };
    updateCategory({ variables: { input } });
  };

  if (error) {
    console.error(error);
  }

  const [removeCategory] = useMutation(REMOVE_CATEGORY, {
    variables: {
      id,
    },
    update(cache){
      props.todos.forEach((todo) => {
        cache.modify({
          id: cache.identify(todo),
          fields: {
            categories(prevCategories, {readField}){
              return prevCategories.filter(cat => readField('id', cat) !== props.id)
            }
          }
        })

      })
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
        {!isEmpty(todos) ? (
          <Header>
            <h3>Todos</h3>
            <button disabled={loading} onClick={addTodo}>
              {" "}
              + Add
            </button>
          </Header>
        ) : null}
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
