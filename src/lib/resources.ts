export type Resource = {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'guide';
  tags: string[];
  imagePlaceholderId: string;
  url: string;
};

export const resources: Resource[] = [];

export const allTags = Array.from(new Set(resources.flatMap(r => r.tags))).sort();
