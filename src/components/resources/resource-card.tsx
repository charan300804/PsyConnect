
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
    <Card className="h-full flex flex-col glass border-white/20 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group/card backdrop-blur-sm bg-white/40 dark:bg-black/20">
      <Link href={resource.url} className="group block h-full flex flex-col" target="_blank" rel="noopener noreferrer">
        <CardHeader className="p-0 relative overflow-hidden">
          <div className="relative aspect-video w-full overflow-hidden">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={resource.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint={placeholder.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white px-2 py-1 rounded-md flex items-center gap-1.5 text-xs font-medium border border-white/10 shadow-sm">
              {typeIcons[resource.type]}
              <span className="capitalize">{resource.type}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 flex-1 space-y-2">
          <CardTitle className="text-xl font-bold font-headline leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {resource.title}
          </CardTitle>
          <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed">
            {resource.description}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-5 pt-0 flex justify-between items-center mt-auto border-t border-white/10 dark:border-white/5 pt-4">
        <div className="flex flex-wrap gap-2">
          {resource.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="bg-primary/5 hover:bg-primary/10 border-primary/20 text-xs font-normal">
              {tag}
            </Badge>
          ))}
          {resource.tags.length > 2 && (
            <span className="text-xs text-muted-foreground flex items-center">+{resource.tags.length - 2}</span>
          )}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); handleSummarize(); }} className="shrink-0 hover:bg-primary/10 text-primary hover:text-primary transition-colors">
              <BookOpen className="mr-2 h-4 w-4" />
              Summarize
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] glass border-white/20">
            <DialogHeader>
              <DialogTitle className="font-headline">Summary of: {resource.title}</DialogTitle>
            </DialogHeader>
            <div className="py-4 min-h-[100px] flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <div className="relative">
                    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  </div>
                  <p className="text-sm font-medium animate-pulse">Analyzing content...</p>
                </div>
              ) : (
                <p className="text-sm text-foreground/90 leading-relaxed bg-muted/30 p-4 rounded-lg border border-white/10">{cachedSummary?.summary}</p>
              )}
            </div>
          </DialogContent>
        </Dialog>

      </CardFooter>
    </Card>
  );
}
