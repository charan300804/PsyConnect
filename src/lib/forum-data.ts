
export type ForumPost = {
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
        isModerator: boolean;
    };
    createdAt: string;
    replies: number;
    views: number;
    tags: string[];
};
  
export const forumPosts: ForumPost[] = [];
