import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  Clock,
  BadgeCheck,
  Stethoscope,
} from "lucide-react";

interface BlogPostCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  authorName: string;
  authorAvatar: string;
  authorSpecialty: string;
  publishedAt: string;
  readTime: string;
  category: string;
  likes: number;
  comments: number;
  isOfficial: boolean;
  featured?: boolean;
}

export function BlogPostCard({
  title,
  excerpt,
  image,
  authorName,
  authorAvatar,
  authorSpecialty,
  publishedAt,
  readTime,
  category,
  likes,
  comments,
  isOfficial,
  featured = false,
}: BlogPostCardProps) {
  if (featured) {
    return (
      <article className="card-clinical overflow-hidden group">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-[16/10] md:aspect-auto bg-secondary overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {isOfficial && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground gap-1">
                <Stethoscope className="h-3 w-3" />
                Official
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit mb-4">
              {category}
            </Badge>

            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h2>

            <p className="text-muted-foreground mb-6 line-clamp-3">{excerpt}</p>

            {/* Author */}
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={authorAvatar} alt={authorName} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {authorName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-foreground text-sm">
                    {authorName}
                  </span>
                  {isOfficial && (
                    <BadgeCheck className="h-4 w-4 text-primary" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {authorSpecialty}
                </span>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{publishedAt}</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readTime}
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {comments}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card-clinical overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-[16/10] bg-secondary overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isOfficial && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground gap-1">
            <Stethoscope className="h-3 w-3" />
            Official
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <Badge variant="secondary" className="text-xs">
          {category}
        </Badge>

        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>

        {/* Author */}
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={authorAvatar} alt={authorName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {authorName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{authorName}</span>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between pt-3 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readTime}
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              {comments}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
