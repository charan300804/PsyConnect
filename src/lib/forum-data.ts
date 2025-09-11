
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
  
export const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'Feeling overwhelmed with exam stress',
      content: 'Exams are coming up and I am feeling super stressed out. I can\'t seem to focus on studying and I\'m worried I\'m going to fail. Does anyone have any tips for managing exam stress?',
      author: { name: 'Alex S.', isModerator: false },
      createdAt: '2 days ago',
      replies: 12,
      views: 156,
      tags: ['exams', 'stress', 'anxiety'],
    },
    {
      id: '2',
      title: 'Tips for making new friends on campus?',
      content: 'I\'m a first-year student and I\'m finding it hard to make friends. I\'m pretty shy and I don\'t know how to start conversations. Any advice would be appreciated!',
      author: { name: 'Jamie L.', isModerator: false },
      createdAt: '5 days ago',
      replies: 8,
      views: 201,
      tags: ['social', 'friends', 'first-year'],
    },
    {
      id: '3',
      title: 'Resource: Free Online Mindfulness Session',
      content: 'Hey everyone, I found a great resource for a free online mindfulness session happening next week. It\'s great for relaxation and focusing. Thought I\'d share the link here for anyone interested!',
      author: { name: 'Chloe M.', isModerator: true },
      createdAt: '1 day ago',
      replies: 3,
      views: 98,
      tags: ['resource', 'mindfulness', 'moderator-post'],
    },
];
