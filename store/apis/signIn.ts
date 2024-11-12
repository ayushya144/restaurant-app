import { createApiInstance } from "./createApiInstance";

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    // signIn: build.mutation({
    //   query({ email, password }) {
    //     const token = email + ':' + password;
    //     return {
    //       url: '/auth/sign-in/',
    //       method: 'GET',
    //       headers: {
    //         authorization: `Basic ${btoa(token)}`,
    //       },
    //     };
    //   },
    //   transformResponse: (res) => {
    //     return res.data;
    //   },
    // }),
    signIn: build.mutation({
      query(query) {
        return {
          url: "/auth/sign-in/",
          method: "POST",
          body: query,
        };
      },
    }),
    getUserInfo: build.query({
      query: () => "/user/info",
      providesTags: ["UserAPI"],
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation, useLazyGetUserInfoQuery } = extendedApi;
