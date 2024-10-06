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
        upvoteDownvote: builder.mutation({
            query: ({ id, token, vote }) => ({
                url: `post/${id}/vote`,
                method: "POST",
                body: vote,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        getCommentByPostId: builder.query({
            query: ({ id, token }) => ({
                url: `post/${id}/comments`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        })
    })
})

export const {useGetAllPostQuery, useGetSinglePostQuery, useUpvoteDownvoteMutation,useGetCommentByPostIdQuery} = postsApi