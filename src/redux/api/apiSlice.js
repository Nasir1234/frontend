  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  const BASE_URL = "http://localhost:5000/api"; // adjust for production if needed

  export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    }),
    tagTypes: ["Order", "User", "Product"],
    endpoints: () => ({}),
  });
