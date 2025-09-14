
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Video, Mic, FileText, BookOpen, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Resource } from '@/lib/resources';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { summarizeSupportResource } from '@/ai/flows/summarize-support-resources';
import { useTranslation } from '@/context/language-context';

type ResourceCardProps = {
  resource: Resource;
};

const typeIcons = {
  video: <Video className="w-4 h-4" />,
  audio: <Mic className="w-4 h-4" />,
  guide: <FileText className="w-4 h-4" />,
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const { t } = useTranslation();
  const placeholder = PlaceHolderImages.find(p => p.id === resource.imagePlaceholderId);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSummarize = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    e.preventDefault();

    setIsDialogOpen(true);
    if (summary) return;

    setIsLoading(true);
    try {
      // In a real app, you would pass the full resource content here.
      // For this prototype, we'll summarize the description.
      const result = await summarizeSupportResource({ resourceText: resource.description });
      setSummary(result.summary);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      setSummary("Sorry, we couldn't generate a summary at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col transition-shadow duration-300 hover:shadow-lg hover:border-primary/50">
      <Link href={resource.url} className="group block" target="_blank" rel="noopener noreferrer">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={resource.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={placeholder.imageHint}
              />
            )}
            <div className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm p-1.5 rounded-md flex items-center gap-1.5 text-xs">
              {typeIcons[resource.type]}
              <span className="capitalize">{resource.type}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-1">
          <CardTitle className="text-lg mb-2 leading-tight group-hover:text-primary transition-colors">
            {resource.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {resource.description}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={handleSummarize} className="shrink-0">
              <BookOpen className="mr-2 h-4 w-4" />
              Summarize
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Summary of: {resource.title}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p>Generating summary...</p>
                </div>
              ) : (
                <p className="text-sm text-foreground">{summary}</p>
              )}
            </div>
          </DialogContent>
        </Dialog>

      </CardFooter>
    </Card>
  );
}
