
import { format } from 'date-fns';
import type { UserRole } from './user-store';
import { addDocument } from './firestore-service';

export type ForumPost = {
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
        isModerator: boolean;
    };
    createdAt: string; // Should be ISO string
    replies: number;
    views: number;
    tags: string[];
};
  
type NewPostData = {
    title: string;
    content: string;
    authorName: string;
    authorRole: UserRole;
}

export async function addForumPost(data: NewPostData) {
    const newPost = {
        title: data.title,
        content: data.content,
        author: {
            name: data.authorName,
            isModerator: data.authorRole === 'admin' || data.authorRole === 'counselor',
        },
        // createdAt is now handled by the server timestamp in addDocument
        replies: 0,
        views: 0,
        // TODO: Implement tag extraction or selection
        tags: ['discussion'], 
    };

    return await addDocument('forumPosts', newPost);
}
