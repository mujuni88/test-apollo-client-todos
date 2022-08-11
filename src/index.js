import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import resolvers from "./apollo/resolvers";
import typeDefs from "./apollo/schema";
import App from "./App";
import { data } from "./mock";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  resolvers, // We will define this later
  typeDefs // We will define is later too :)
});

// This sets up our cache with a todos field for us to interact with
cache.writeData({
  data: {
    ...data
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
