import { baseApi } from "@/redux/api/baseApi";

const postsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPost: builder.query({
            query: (args) => {
                return {
                    url: "post/posts",
                    method: "GET"
                }
            }
        }),
        getSinglePost: builder.query({
            query: ({ id, token }) => ({
                url: `post/${id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    })
})

export const {useGetAllPostQuery, useGetSinglePostQuery} = postsApi