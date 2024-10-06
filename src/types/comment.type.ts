import { TAuthor } from "./post.type";

export type TComment = {
    _id: string;
    postId: string;
    userId: TAuthor;
    comment: string;
    replies: string[];  // Assuming replies are an array of strings (could be updated to reflect actual reply structure)
    createdAt: string;
    updatedAt: string;
    __v: number;
};