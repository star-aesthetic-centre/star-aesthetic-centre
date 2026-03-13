import { GraphQLClient } from "graphql-request";

// Disable strict SSL for local development with self-signed certs (e.g. LocalWP)
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const endpoint = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL!;

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
  },
  fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' })
});

export default graphqlClient;
