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
      __typename: 'Todo',
      id: 1,
      text: "Music Health navigating",
      isCompleted: false,
      categories: [
        {
          __typename: 'Category',
          id: 1,
          label: "plum"
        }
      ]
    },
    {
      __typename: 'Todo',
      id: 2,
      text: "driver",
      isCompleted: true,
      categories: [
        {
          __typename: 'Category',
          id: 3,
          label: "generating"
        }
      ]
    },
  ],
  categories: [
    {
      __typename: 'Category',
      id: 1,
      label: "plum",
      todos: [
        {
          __typename: 'Todo',
          id: 1,
          text: "Music Health navigating",
          isCompleted: false,
        }
      ]
    },
    {
      __typename: 'Category',
      id: 3,
      label: "generating",
      todos: [
        {
          __typename: 'Todo',
          id: 2,
          text: "driver",
          isCompleted: true,
        }]
    },
    {
      __typename: 'Todo',
      id: 2,
      label: "Corporate",
      todos: [
      ]
    },
  ]
};

export const normalizedCache = {
  "ROOT_QUERY": {
    "__typename": "Query",
    "todos": [
      {
        "__ref": "Todo:1"
      },
      {
        "__ref": "Todo:2"
      }, {
        "__ref": "Todo:3"
      }
    ],
    "categories": [
      {
        "__ref": "Category:1"
      },
      {
        "__ref": "Category:2"
      }
    ]
  },
  "Category:1": {
    "__typename": "Category",
    "id": 1,
    "label": "CATEGORY 1",
    "todos": [
      {
        "__ref": "Todo:1"
      },
      {
        "__ref": "Todo:2"
      },
      {
        "__ref": "Todo:3"
      }
    ]
  },
  "Category:2": {
    "__typename": "Category",
    "id": 2,
    "label": "CATEGORY 2",
    "todos": []
  },
  "Todo:1": {
    "__typename": "Todo",
    "id": 1,
    "text": "TODO 1",
    "isCompleted": false,
    "categories": [
      {
        "__ref": "Category:1"
      }
    ]
  },
  "Todo:2": {
    "__typename": "Todo",
    "id": 2,
    "text": "TODO 2",
    "isCompleted": false,
    "categories": [
      {
        "__ref": "Category:1"
      }
    ]
  },
  "Todo:3": {
    "__typename": "Todo",
    "id": 3,
    "text": "TODO 3",
    "isCompleted": true,
    "categories": [
      {
        "__ref": "Category:1"
      }
    ]
  }
}
