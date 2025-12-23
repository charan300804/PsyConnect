export type Resource = {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'guide';
  url: string;
  tags: string[];
  imagePlaceholderId: string;
};

export const allTags = [
  'Anxiety',
  'Depression',
  'Stress',
  'Mindfulness',
  'Self-Care',
  'Sleep',
  'Relationships',
  'Therapy',
  'Mental Health',
  'Wellness',
  'Panic',
  'Mental Strength',
].sort();

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Anxiety Disorders',
    description: 'A comprehensive overview of anxiety disorders, including symptoms, types, and treatment options available.',
    type: 'guide',
    url: 'https://en.wikipedia.org/wiki/Anxiety_disorder',
    tags: ['Anxiety', 'Mental Health'],
    imagePlaceholderId: 'img-1',
  },
  {
    id: '2',
    title: 'Major Depressive Disorder',
    description: 'Learn about clinical depression, its causes, diagnosis, and management strategies.',
    type: 'guide',
    url: 'https://en.wikipedia.org/wiki/Major_depressive_disorder',
    tags: ['Depression', 'Mental Health'],
    imagePlaceholderId: 'img-2',
  },
  {
    id: '3',
    title: 'Stress Management Techniques',
    description: 'Explore various methods and strategies to effectively cope with and manage psychological stress.',
    type: 'guide',
    url: 'https://en.wikipedia.org/wiki/Stress_management',
    tags: ['Stress', 'Self-Care'],
    imagePlaceholderId: 'img-3',
  },
  {
    id: '4',
    title: 'Mindfulness Practice',
    description: 'Discover the practice of mindfulness and how it can help reduce stress and improve mental well-being.',
    type: 'guide',
    url: 'https://en.wikipedia.org/wiki/Mindfulness',
    tags: ['Mindfulness', 'Wellness'],
    imagePlaceholderId: 'img-4',
  },
  {
    id: '5',
    title: 'Cognitive Behavioral Therapy (CBT)',
    description: 'An in-depth look at CBT, a psycho-social intervention that aims to improve mental health.',
    type: 'guide',
    url: 'https://en.wikipedia.org/wiki/Cognitive_behavioral_therapy',
    tags: ['Therapy', 'Anxiety', 'Depression'],
    imagePlaceholderId: 'img-5',
  },
  {
    id: '6',
    title: 'Sleep Hygiene',
    description: 'Understand the importance of good sleep habits and how to improve your sleep quality.',
    type: 'guide',
    url: 'https://en.wikipedia.org/wiki/Sleep_hygiene',
    tags: ['Sleep', 'Self-Care'],
    imagePlaceholderId: 'img-6',
  },
  {
    id: '7',
    title: 'Panic Attack',
    description: 'Information on panic attacks, their symptoms, causes, and how to manage them.',
    type: 'guide',
    url: 'https://en.wikipedia.org/wiki/Panic_attack',
    tags: ['Anxiety', 'Panic'],
    imagePlaceholderId: 'img-7',
  },
  {
    id: '8',
    title: 'Psychological Resilience',
    description: 'Learn about the capacity to recover quickly from difficulties and how to build mental toughness.',
    type: 'guide',
    url: 'https://en.wikipedia.org/wiki/Psychological_resilience',
    tags: ['Self-Care', 'Mental Strength'],
    imagePlaceholderId: 'img-8',
  },
];
