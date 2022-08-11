/*
import { faker } from "@faker-js/faker";

export function createRandomCategory(id) {
  return {
    id: id || faker.datatype.number(),
    label: faker.random.word()
  };
}

export function createRandomTodo(id) {
  return {
    id: id || faker.datatype.number(),
    text: faker.random.words(),
    isCompleted: faker.datatype.boolean()
  };
}

function shuffle(_todos, _categories) {
  // loop through todos and randomly add categories
  const todos = _todos.map((todo) => ({
    ...todo,
    categories: _categories.slice(faker.mersenne.rand(_categories.length - 1))
  }));

  const categories = _categories.map((category) => ({
    ...category,
    todos: _todos.slice(faker.mersenne.rand(_todos.length - 1))
  }));

  return { todos, categories };
}

export const generateData = (length) => {
  const todos = [];
  const categories = [];

  Array.from({ length }).forEach((_, i) => {
    todos.push(createRandomTodo(i + 1));
    categories.push(createRandomCategory(i + 1));
  });

  return shuffle(todos, categories);
};
*/

export const data = {
  todos: [
    {
      id: 1,
      text: "Music Health navigating",
      isCompleted: false,
      categories: [
        {
          id: 1,
          label: "plum"
        }
      ]
    },
    {
      id: 2,
      text: "driver",
      isCompleted: true,
      categories: [
        {
          id: 3,
          label: "generating"
        }
      ]
    },
    {
      id: 3,
      text: "ROI copy",
      isCompleted: false,
      categories: []
    }
  ],
  categories: [
    {
      id: 1,
      label: "plum",
      todos: [
        {
          id: 2,
          text: "driver",
          isCompleted: true
        }
      ]
    },
    {
      id: 2,
      label: "Corporate",
      todos: [
        {
          id: 1,
          text: "Music Health navigating",
          isCompleted: false
        },
        {
          id: 2,
          text: "driver",
          isCompleted: true
        },
        {
          id: 3,
          text: "ROI copy",
          isCompleted: false
        }
      ]
    },
    {
      id: 3,
      label: "generating",
      todos: []
    }
  ]
};
