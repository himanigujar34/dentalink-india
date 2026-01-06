import { Heart, MessageCircle, Share2, MoreHorizontal, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClinicalCaseCardProps {
  doctorName: string;
  specialty: string;
  isVerified?: boolean;
  avatarUrl?: string;
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
  procedure: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

export function ClinicalCaseCard({
  doctorName,
  specialty,
  isVerified = false,
  avatarUrl,
  beforeImage,
  afterImage,
  title,
  description,
  procedure,
  likes,
  comments,
  timeAgo,
}: ClinicalCaseCardProps) {
  return (
    <div className="card-clinical overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-semibold text-sm overflow-hidden">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={doctorName}
                className="h-full w-full object-cover"
              />
            ) : (
              doctorName.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">{doctorName}</span>
              {isVerified && (
                <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">{specialty}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Before/After Images */}
      <div className="relative">
        <div className="grid grid-cols-2 gap-0.5">
          <div className="relative aspect-[4/3] bg-secondary">
            <img
              src={beforeImage}
              alt="Before"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-2 left-2 px-2 py-1 bg-foreground/80 text-background text-xs font-medium rounded">
              Before
            </span>
          </div>
          <div className="relative aspect-[4/3] bg-secondary">
            <img
              src={afterImage}
              alt="After"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-2 right-2 px-2 py-1 bg-mint text-mint-foreground text-xs font-medium rounded">
              After
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Procedure Badge */}
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
          {procedure}
        </span>

        {/* Title & Description */}
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive transition-colors">
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">{likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{comments}</span>
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}
