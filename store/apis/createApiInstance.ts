import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { deleteAllCookies, getCookie, setCookie } from "@/utils/commonFuntions";
import config from "./../../config";
import { setUserInfo } from "../slices/user";

interface RefreshResult {
  status: number;
  data: {
    token: string;
    refToken: string;
    user: Record<string, any>; // Adjust based on your actual user structure
  };
}

const refreshQuery = async (args: any, api: any, extraOptions: any) => {
  const headers = new Headers();

  const token = await getCookie("refresh"); // Await the promise
  if (token) {
    headers.set("x-refresh-token", token);
  }

  return fetchBaseQuery({
    baseUrl: config.baseUrl,
    prepareHeaders: (headers) => {
      // This section can remain the same
      return headers;
    },
  })(args, api, extraOptions);
};

const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const headers = new Headers();

  // Fetch the token asynchronously
  const tokenCookie = await getCookie("token");
  console.log(tokenCookie);
  const token = tokenCookie ? JSON.parse(tokenCookie) : false;

  console.log(getCookie("token"), "ahsdbgahsdsadhasbd");

  headers.set("ngrok-skip-browser-warning", "1");
  console.log({ token });
  if (token) {
    headers.set("authorization", token);
  }

  // Call the original fetchBaseQuery with the configured headers
  const fetch = fetchBaseQuery({
    baseUrl: config.baseUrl,
    prepareHeaders: (headers) => {
      // This section can remain empty or include additional header configurations
      return headers;
    },
  });

  return fetch(args, api, extraOptions);
};

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // First, try the original base query
  let result = await baseQuery(args, api, extraOptions);

  console.log({ result });

  // Check for 401 Unauthorized
  if (result.error && result.error.status === 401) {
    // Retrieve the refresh token asynchronously
    const refreshCookie = await getCookie("refresh");
    const token = refreshCookie ? JSON.parse(refreshCookie as string) : false;

    if (token) {
      // Try to get a new token
      const refreshResult = (await refreshQuery(
        "/auth/refresh-token",
        api,
        extraOptions
      )) as { data: RefreshResult };

      if (
        refreshResult?.data?.status === 200 &&
        refreshResult?.data?.data?.token &&
        refreshResult?.data?.data?.refToken
      ) {
        // Set new tokens in cookies
        setCookie("token", refreshResult.data.data.token);
        setCookie("refresh", refreshResult.data.data.refToken);

        // Store the new user info in the Redux store
        api.dispatch(setUserInfo(refreshResult.data.data.user));

        // Retry the original query with the new token
        return await baseQuery(args, api, extraOptions);
      }
    }

    // If the refresh token retrieval fails, logout the user
    // deleteAllCookies();
    api.dispatch({ type: "logout" });
    window.location.href = "/sign-in";
  }

  // Check for 403 Forbidden errors
  if (result.error && result.error.status === 403) {
    console.error("You do not have permission to access", result.error);
  }

  // Return the result
  return result;
};

// Initialize an empty api service that we'll inject endpoints into later as needed
export const createApiInstance = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserAPI"],
  endpoints: () => ({}),
});

export default createApiInstance;
