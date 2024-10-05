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
        })
    })
})

export const {useGetAllPostQuery} = postsApi