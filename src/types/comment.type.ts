import { TAuthor } from "./post.type";

export type TComment = {
  _id: string;
  postId: string;
  userId: TAuthor;
  comment: string;
  replies: string[]; // Assuming replies are an array of strings (could be updated to reflect actual reply structure)
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TTableUser = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AuthorDetails = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AuthorUpvote = {
  _id: string;
  totalUpvotes: number;
  authorDetails: AuthorDetails;
};

export type TPremiumUserStats = {
  count: number;
  premiumStatus: "Premium Member" | "Not Premium";
};
