import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  UserCheck,
  Building2,
  Stethoscope,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

type UserType = "professional" | "clinic" | "distributor";

interface FollowButtonProps {
  isFollowing?: boolean;
  userType: UserType;
  onFollow?: () => void;
  onUnfollow?: () => void;
  size?: "sm" | "default" | "lg";
  className?: string;
}

const userTypeConfig = {
  professional: {
    icon: Stethoscope,
    followLabel: "Connect",
    followingLabel: "Connected",
    pendingLabel: "Pending",
  },
  clinic: {
    icon: Building2,
    followLabel: "Follow Clinic",
    followingLabel: "Following",
    pendingLabel: "Requested",
  },
  distributor: {
    icon: Package,
    followLabel: "Follow",
    followingLabel: "Following",
    pendingLabel: "Pending",
  },
};

export function FollowButton({
  isFollowing = false,
  userType,
  onFollow,
  onUnfollow,
  size = "default",
  className,
}: FollowButtonProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);

  const config = userTypeConfig[userType];
  const Icon = following ? UserCheck : UserPlus;

  const handleClick = async () => {
    setLoading(true);
    try {
      if (following) {
        await onUnfollow?.();
      } else {
        await onFollow?.();
      }
      setFollowing(!following);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={following ? "secondary" : "default"}
      size={size}
      className={cn(
        "gap-2 transition-all",
        following
          ? "bg-secondary text-foreground hover:bg-destructive/10 hover:text-destructive"
          : "btn-trust",
        className
      )}
      onClick={handleClick}
      disabled={loading}
    >
      <Icon className="h-4 w-4" />
      <span>
        {following ? config.followingLabel : config.followLabel}
      </span>
    </Button>
  );
}
