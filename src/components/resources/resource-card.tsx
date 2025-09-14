
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

type CachedSummary = {
  summary: string;
  timestamp: number;
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const { t } = useTranslation();
  const placeholder = PlaceHolderImages.find(p => p.id === resource.imagePlaceholderId);
  const [cachedSummary, setCachedSummary] = useState<CachedSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Admin-configurable setting (simulated)
  const summaryLength: 'short' | 'medium' | 'detailed' = 'medium';

  const handleSummarize = async () => {
    // Open the dialog immediately
    setIsDialogOpen(true);

    // Check for a valid, non-expired cache entry
    const now = Date.now();
    if (cachedSummary && (now - cachedSummary.timestamp) < 24 * 60 * 60 * 1000) {
      // Use cached summary, no loading needed
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, you would pass the full resource content.
      // For this prototype, we summarize the description.
      const result = await summarizeSupportResource({ 
        resourceText: resource.description,
        summaryLength: summaryLength
      });
      const newSummary = { summary: result.summary, timestamp: Date.now() };
      setCachedSummary(newSummary);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      setCachedSummary({
        summary: "Sorry, we couldn't generate a summary at this time.",
        timestamp: Date.now(),
      });
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
            <div className="py-4 min-h-[100px] flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p>Generating summary...</p>
                </div>
              ) : (
                <p className="text-sm text-foreground">{cachedSummary?.summary}</p>
              )}
            </div>
          </DialogContent>
        </Dialog>

      </CardFooter>
    </Card>
  );
}
