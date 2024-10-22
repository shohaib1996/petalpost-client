import { baseApi } from "@/redux/api/baseApi";

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: ({ data, token }) => {
        return {
          url: "/post/create-post",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updatePost: builder.mutation({
      query: ({ data, token, postId }) => {
        return {
          url: `/post/${postId}`,
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deletePost: builder.mutation({
      query: ({ token, postId }) => {
        return {
          url: `/post/${postId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getAllPost: builder.query({
      query: ({ searchQuery, page, filter }) => {

        let queryString = `?page=${page}`;
        if (searchQuery) {
          queryString = `?title=${searchQuery}&page=${page}`;
        }
        if (filter) {
          queryString = `?sortBy=${filter}&page=${page}`;
        }

        console.log(queryString);
        
    
        return {
          url: `post/posts${queryString}`,
          method: "GET",
        };
      },
    }),
    
    getAllPostsWithoutPagination: builder.query({
      query: ({ token }) => {
        return {
          url: `post/posts/all`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
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
    getPostByUserId: builder.query({
      query: ({ userId, token }) => ({
        url: `post/user/${userId}`,
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
    }),
    getTopAuthor: builder.query({
      query: ({ token }) => ({
        url: `post/upvotes/top-authors`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetSinglePostQuery,
  useUpvoteDownvoteMutation,
  useGetCommentByPostIdQuery,
  useAddPostMutation,
  useGetPostByUserIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetAllPostsWithoutPaginationQuery,
  useGetTopAuthorQuery,
} = postsApi;
