import { MapPin, Clock, IndianRupee, Stethoscope, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  clinicName: string;
  location: string;
  distance: string;
  jobType: "Full-time" | "Part-time" | "Locum" | "Consultant";
  specialization: string;
  dailyRate?: string;
  splitPercentage?: string;
  equipment: string[];
  daysRequired: string[];
  postedAgo: string;
  isNew?: boolean;
}

export function JobCard({
  clinicName,
  location,
  distance,
  jobType,
  specialization,
  dailyRate,
  splitPercentage,
  equipment,
  daysRequired,
  postedAgo,
  isNew = false,
}: JobCardProps) {
  const getJobTypeBadgeStyles = () => {
    switch (jobType) {
      case "Full-time":
        return "bg-primary text-primary-foreground";
      case "Locum":
        return "bg-amber-100 text-amber-700";
      case "Consultant":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="card-clinical p-5 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{clinicName}</h3>
              {isNew && (
                <span className="badge-verified text-[10px]">NEW</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{location}</span>
              <span className="text-xs bg-mint px-1.5 py-0.5 rounded text-mint-foreground">
                {distance}
              </span>
            </div>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeBadgeStyles()}`}
        >
          {jobType}
        </span>
      </div>

      {/* Specialization */}
      <div className="flex items-center gap-2">
        <Stethoscope className="h-4 w-4 text-primary" />
        <span className="font-medium text-foreground">{specialization}</span>
      </div>

      {/* Compensation */}
      <div className="flex flex-wrap gap-3">
        {dailyRate && (
          <div className="flex items-center gap-1.5 px-3 py-2 bg-secondary rounded-lg">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {dailyRate}/day
            </span>
          </div>
        )}
        {splitPercentage && (
          <div className="flex items-center gap-1.5 px-3 py-2 bg-secondary rounded-lg">
            <span className="text-sm font-medium text-foreground">
              {splitPercentage} Split
            </span>
          </div>
        )}
      </div>

      {/* Days Required */}
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <div className="flex flex-wrap gap-1.5">
          {daysRequired.map((day) => (
            <span
              key={day}
              className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded"
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Equipment */}
      <div className="flex flex-wrap gap-1.5">
        {equipment.map((item) => (
          <span
            key={item}
            className="px-2 py-1 bg-mint/50 text-mint-foreground text-xs rounded"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">{postedAgo}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Save
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
