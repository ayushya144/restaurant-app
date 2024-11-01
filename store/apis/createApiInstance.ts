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

const refreshQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
  prepareHeaders: (headers) => {
    const token = getCookie("refresh")
      ? JSON.parse(getCookie("refresh") as string)
      : false;
    if (token) {
      headers.set("x-refresh-token", token);
    }
    return headers;
  },
});

console.log({ sddabdjsabdjabsdkjasbdkbasjdbsadbkkjasd: config.baseUrl });

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
  prepareHeaders: (headers) => {
    const token = getCookie("token")
      ? JSON.parse(getCookie("token") as string)
      : false;
    headers.set("ngrok-skip-browser-warning", "1");
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  console.log({ resultaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: result });

  if (result.error && result.error.status === 401) {
    // const token = getCookie("refresh")
    //   ? JSON.parse(getCookie("refresh") as string)
    //   : false;

    // if (token) {
    //   // try to get a new token
    //   const refreshResult = (await refreshQuery(
    //     "/auth/refresh-token",
    //     api,
    //     extraOptions
    //   )) as { data: RefreshResult };

    //   if (
    //     refreshResult?.data?.status === 200 &&
    //     refreshResult?.data?.data?.token &&
    //     refreshResult?.data?.data?.refToken
    //   ) {
    //     // Set new tokens
    //     setCookie("token", refreshResult.data.data.token);
    //     setCookie("refresh", refreshResult.data.data.refToken);

    //     // Store the new user info
    //     api.dispatch(setUserInfo(refreshResult.data.data.user));

    //     // Retry the original query with new token
    //     return await baseQuery(args, api, extraOptions);
    //   }
    // }

    // Logout if refresh fails
    deleteAllCookies();
    api.dispatch({ type: "logout" });
    window.location.href = "/sign-in";
  }

  if (result.error && result.error.status === 403) {
    console.error("You do not have permission to access", result.error);
  }

  return result;
};

// Initialize an empty api service that we'll inject endpoints into later as needed
export const createApiInstance = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserAPI"],
  endpoints: () => ({}),
});

export default createApiInstance;
