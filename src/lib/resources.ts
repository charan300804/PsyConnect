export type Resource = {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'guide';
  tags: string[];
  imagePlaceholderId: string;
  url: string;
};

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Guided Meditation for Stress Relief',
    description: 'A 10-minute guided meditation to help you find calm and reduce stress. Perfect for beginners.',
    type: 'audio',
    tags: ['meditation', 'stress', 'mindfulness'],
    imagePlaceholderId: 'resource-1',
    url: '#',
  },
  {
    id: '2',
    title: 'The Power of Journaling',
    description: 'Learn how to start a journaling practice to process your thoughts and emotions effectively.',
    type: 'guide',
    tags: ['journaling', 'self-reflection', 'emotional health'],
    imagePlaceholderId: 'resource-2',
    url: '#',
  },
  {
    id: '3',
    title: 'Understanding Anxiety',
    description: 'An animated video explaining what anxiety is, how it affects you, and simple coping strategies.',
    type: 'video',
    tags: ['anxiety', 'education', 'coping'],
    imagePlaceholderId: 'resource-6',
    url: '#',
  },
  {
    id: '4',
    title: 'Soothing Sounds for Sleep',
    description: 'A collection of ambient sounds and gentle music to help you relax and fall asleep.',
    type: 'audio',
    tags: ['sleep', 'relaxation', 'music'],
    imagePlaceholderId: 'resource-3',
    url: '#',
  },
  {
    id: '5',
    title: 'Beginner\'s Guide to Yoga',
    description: 'Start your yoga journey with this guide covering basic poses for mental and physical well-being.',
    type: 'guide',
    tags: ['yoga', 'exercise', 'mindfulness'],
    imagePlaceholderId: 'resource-4',
    url: '#',
  },
  {
    id: '6',
    title: 'How to Support a Friend',
    description: 'A video guide on how to offer meaningful support to a friend who is struggling.',
    type: 'video',
    tags: ['relationships', 'support', 'communication'],
    imagePlaceholderId: 'resource-5',
    url: '#',
  },
];

export const allTags = Array.from(new Set(resources.flatMap(r => r.tags))).sort();
