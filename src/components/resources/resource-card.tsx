
import Link from 'next/link';
import Image from 'next/image';
import { Video, Mic, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Resource } from '@/lib/resources';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ResourceCardProps = {
  resource: Resource;
};

const typeIcons = {
  video: <Video className="w-4 h-4" />,
  audio: <Mic className="w-4 h-4" />,
  guide: <FileText className="w-4 h-4" />,
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === resource.imagePlaceholderId);

  return (
    <Link href={resource.url} className="group block" target="_blank" rel="noopener noreferrer">
      <Card className="h-full flex flex-col transition-shadow duration-300 hover:shadow-lg hover:border-primary/50">
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
          <p className="text-sm text-muted-foreground line-clamp-3">
            {resource.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
