import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MapPin, SlidersHorizontal, Search } from "lucide-react";

const mockJobs = [
  {
    clinicName: "Smile Care Dental",
    location: "Andheri West, Mumbai",
    distance: "3.2 km",
    jobType: "Locum" as const,
    specialization: "General Dentist (BDS)",
    dailyRate: "₹3,500",
    equipment: ["OPG", "RVG", "Autoclave"],
    daysRequired: ["Mon", "Wed", "Fri"],
    postedAgo: "Posted 2 hours ago",
    isNew: true,
  },
  {
    clinicName: "Perfect Teeth Clinic",
    location: "Bandra, Mumbai",
    distance: "5.8 km",
    jobType: "Consultant" as const,
    specialization: "Endodontist (MDS)",
    splitPercentage: "40%",
    equipment: ["RVG", "Apex Locator", "Rotary Endo"],
    daysRequired: ["Tue", "Thu", "Sat"],
    postedAgo: "Posted 1 day ago",
    isNew: false,
  },
  {
    clinicName: "DentaCare Plus",
    location: "Juhu, Mumbai",
    distance: "7.1 km",
    jobType: "Full-time" as const,
    specialization: "Oral Surgeon (MDS)",
    dailyRate: "₹8,000",
    splitPercentage: "50%",
    equipment: ["OPG", "CBCT", "Surgical Motor"],
    daysRequired: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    postedAgo: "Posted 3 days ago",
    isNew: false,
  },
  {
    clinicName: "Healthy Smile Clinic",
    location: "Powai, Mumbai",
    distance: "9.5 km",
    jobType: "Part-time" as const,
    specialization: "Prosthodontist (MDS)",
    splitPercentage: "35%",
    equipment: ["RVG", "CAD/CAM"],
    daysRequired: ["Sat", "Sun"],
    postedAgo: "Posted 5 days ago",
    isNew: false,
  },
];

const equipmentOptions = [
  { id: "opg", label: "OPG Machine" },
  { id: "rvg", label: "RVG (Digital X-ray)" },
  { id: "cbct", label: "CBCT Scanner" },
  { id: "laser", label: "Dental Laser" },
  { id: "cadcam", label: "CAD/CAM System" },
];

export default function FindWork() {
  const [distance, setDistance] = useState([10]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Find Work Opportunities
          </h1>
          <p className="text-muted-foreground mt-1">
            Discover jobs matched to your skills, location, and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="card-clinical p-6 space-y-6 sticky top-24">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </h2>

              {/* Location Radius */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Distance</Label>
                  <span className="text-sm text-primary font-medium">
                    {distance[0]} km
                  </span>
                </div>
                <Slider
                  value={distance}
                  onValueChange={setDistance}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Job Type */}
              <div className="space-y-3">
                <Label className="text-sm">Job Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="fulltime">Full-time</SelectItem>
                    <SelectItem value="parttime">Part-time</SelectItem>
                    <SelectItem value="locum">Locum</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Compensation */}
              <div className="space-y-3">
                <Label className="text-sm">Compensation</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="daily">Daily Rate</SelectItem>
                    <SelectItem value="split">Per-Case Split</SelectItem>
                    <SelectItem value="salary">Fixed Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Equipment */}
              <div className="space-y-3">
                <Label className="text-sm">Equipment Available</Label>
                <div className="space-y-2">
                  {equipmentOptions.map((equipment) => (
                    <div
                      key={equipment.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={equipment.id}
                        checked={selectedEquipment.includes(equipment.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedEquipment([
                              ...selectedEquipment,
                              equipment.id,
                            ]);
                          } else {
                            setSelectedEquipment(
                              selectedEquipment.filter((e) => e !== equipment.id)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={equipment.id}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {equipment.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search Bar & Mobile Filter */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by clinic, specialization..."
                  className="input-clinical pl-10"
                />
              </div>

              {/* Mobile Filter Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Filter Jobs</SheetTitle>
                    <SheetDescription>
                      Customize your job search preferences
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Distance */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Distance</Label>
                        <span className="text-sm text-primary font-medium">
                          {distance[0]} km
                        </span>
                      </div>
                      <Slider
                        value={distance}
                        onValueChange={setDistance}
                        max={50}
                        min={1}
                        step={1}
                      />
                    </div>

                    <Button className="w-full btn-trust">Apply Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Location Indicator */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                Showing jobs within <strong className="text-foreground">{distance[0]} km</strong> of your location
              </span>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {mockJobs.map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
