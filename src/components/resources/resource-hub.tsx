
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
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('resources_search_placeholder')}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
            <Badge
                variant={selectedTags.length === 0 ? 'default' : 'secondary'}
                onClick={() => setSelectedTags([])}
                className="cursor-pointer transition-transform transform hover:scale-105"
            >
                {t('resources_all_tags')}
            </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'secondary'}
              onClick={() => toggleTag(tag)}
              className="cursor-pointer transition-transform transform hover:scale-105"
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
