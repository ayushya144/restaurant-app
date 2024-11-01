import { createApiInstance } from "./createApiInstance";

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: (query) => "/orders",
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllOrdersQuery } = extendedApi;
