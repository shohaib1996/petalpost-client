export interface IPost {
    _id: string;
    title: string;
    content: string;
    author: string;  
    images: string[]; 
    videos: string[]; 
    tags: string[];
    category: string; 
    upvotes: number; 
    downvotes: number; 
    isPremium: boolean; 
    createdAt: string; 
    updatedAt: string; 
    __v: number; 
    voters: string[]; 
  }
  