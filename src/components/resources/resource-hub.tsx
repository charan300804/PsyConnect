
'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Resource, allTags } from '@/lib/resources';
import ResourceCard from './resource-card';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/context/language-context';

type ResourceHubProps = {
  allResources: Resource[];
};

export default function ResourceHub({ allResources }: ResourceHubProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const filteredResources = allResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => resource.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <div className="relative flex-1 max-w-2xl w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('resources_search_placeholder')}
            className="pl-12 h-12 text-lg glass border-white/20 focus:border-primary/50 rounded-full shadow-sm transition-all duration-300 focus:shadow-md bg-white/40 dark:bg-black/20 backdrop-blur-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge
            variant={selectedTags.length === 0 ? 'default' : 'outline'}
            onClick={() => setSelectedTags([])}
            className={cn(
              "cursor-pointer px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105 border-primary/20",
              selectedTags.length === 0 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "bg-white/30 hover:bg-white/50 dark:bg-white/5 dark:hover:bg-white/10 glass"
            )}
          >
            {t('resources_all_tags')}
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              onClick={() => toggleTag(tag)}
              className={cn(
                "cursor-pointer px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105 border-primary/20",
                selectedTags.includes(tag) ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "bg-white/30 hover:bg-white/50 dark:bg-white/5 dark:hover:bg-white/10 glass"
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">{t('resources_no_results')}</p>
        </div>
      )}
    </div>
  );
}
