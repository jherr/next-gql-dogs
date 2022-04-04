import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";

import { getSdk } from "../src/generated/graphql";

const gqlClient = new GraphQLClient("http://localhost:3000/api/graphql");
export const { getDogs, dogByName } = getSdk(gqlClient);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
