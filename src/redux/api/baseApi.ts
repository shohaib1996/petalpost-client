/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/",
});

const baseQueryWithoutAuth: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  // console.log(result);

  if (result?.error?.status === 404) {
    console.error("Error 404: Not Found");
  } else if (result?.error?.status === 401) {
    console.error("Error 401: Unauthorized");
  } else if (result?.error?.status === "PARSING_ERROR") {
    console.error("Error 500: Unauthorized");
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithoutAuth,
  endpoints: () => ({}),
});
