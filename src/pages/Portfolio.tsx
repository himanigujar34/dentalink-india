import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClinicalCaseCard } from "@/components/ClinicalCaseCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Camera,
  Upload,
  Grid3X3,
  List,
  BadgeCheck,
  Eye,
} from "lucide-react";

const mockCases = [
  {
    doctorName: "Dr. You",
    specialty: "Your Clinic",
    isVerified: true,
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop",
    title: "Complete Root Canal Treatment",
    description: "Successful treatment of a necrotic pulp with periapical pathology.",
    procedure: "RCT",
    likes: 124,
    comments: 18,
    timeAgo: "2 days ago",
  },
  {
    doctorName: "Dr. You",
    specialty: "Your Clinic",
    isVerified: true,
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
    title: "Composite Veneer Placement",
    description: "Direct composite veneers for anterior teeth aesthetics improvement.",
    procedure: "Cosmetic",
    likes: 89,
    comments: 12,
    timeAgo: "1 week ago",
  },
];

const procedures = [
  "Root Canal Treatment",
  "Orthodontics",
  "Implant",
  "Extraction",
  "Crown & Bridge",
  "Cosmetic Dentistry",
  "Periodontics",
  "Pediatric",
  "Oral Surgery",
];

export default function Portfolio() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              My Portfolio
            </h1>
            <p className="text-muted-foreground mt-1">
              Showcase your clinical work and build your professional reputation
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-trust gap-2">
                <Plus className="h-4 w-4" />
                Add New Case
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Clinical Case</DialogTitle>
                <DialogDescription>
                  Share your work with the dental community. Before/after photos
                  help showcase your expertise.
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-6 mt-4">
                {/* Case Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Case Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Complex Root Canal Treatment"
                    className="input-clinical"
                  />
                </div>

                {/* Procedure Type */}
                <div className="space-y-2">
                  <Label>Procedure Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select procedure" />
                    </SelectTrigger>
                    <SelectContent>
                      {procedures.map((proc) => (
                        <SelectItem key={proc} value={proc.toLowerCase()}>
                          {proc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Image Upload */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Before Photo</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>After Photo</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Case Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the case, treatment approach, and outcomes..."
                    className="input-clinical min-h-[100px]"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 btn-trust">
                    Publish Case
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card-clinical p-4 text-center">
            <Camera className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">
              {mockCases.length}
            </p>
            <p className="text-xs text-muted-foreground">Total Cases</p>
          </div>
          <div className="card-clinical p-4 text-center">
            <Eye className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">1.2K</p>
            <p className="text-xs text-muted-foreground">Total Views</p>
          </div>
          <div className="card-clinical p-4 text-center">
            <BadgeCheck className="h-6 w-6 text-mint-foreground mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">Verified</p>
            <p className="text-xs text-muted-foreground">DCI Status</p>
          </div>
        </div>

        {/* View Toggle & Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 p-1 bg-secondary rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-background shadow text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-background shadow text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Procedures</SelectItem>
              {procedures.map((proc) => (
                <SelectItem key={proc} value={proc.toLowerCase()}>
                  {proc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cases Grid */}
        {mockCases.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            {mockCases.map((caseData, index) => (
              <ClinicalCaseCard key={index} {...caseData} />
            ))}
          </div>
        ) : (
          <div className="card-clinical p-12 text-center">
            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground text-lg mb-2">
              No Cases Yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Start building your portfolio by adding your first clinical case.
              Before/after photos help showcase your expertise.
            </p>
            <Button
              className="btn-trust gap-2"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Your First Case
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
