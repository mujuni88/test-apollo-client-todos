import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import resolvers from "./apollo/resolvers";
import typeDefs from "./apollo/schema";
import App from "./App";
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import { normalizedCache } from './mock'

// await before instantiating ApolloClient, else queries might run before the cache is persisted
const cache = new InMemoryCache();

const init = async () => {

  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });

  cache.restore(normalizedCache)

  const client = new ApolloClient({
    cache,
    resolvers, // We will define this later
    typeDefs // We will define is later too :)
  });

  // This sets up our cache with a todos field for us to interact with
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById("root")
  );
}

init();