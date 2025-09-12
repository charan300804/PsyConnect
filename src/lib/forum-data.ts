
import { format } from 'date-fns';
import type { UserRole } from './user-store';

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

type NewPostData = {
    title: string;
    content: string;
    authorName: string;
    authorRole: UserRole;
}

export function addForumPost(data: NewPostData) {
    const newPost: ForumPost = {
        id: `post-${Date.now()}`,
        title: data.title,
        content: data.content,
        author: {
            name: data.authorName,
            isModerator: data.authorRole === 'admin' || data.authorRole === 'counselor',
        },
        createdAt: format(new Date(), 'PP'),
        replies: 0,
        views: 0,
        // TODO: Implement tag extraction or selection
        tags: ['discussion'], 
    };
    forumPosts.unshift(newPost);
}
