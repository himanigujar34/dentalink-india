import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClinicalCaseCard } from "@/components/ClinicalCaseCard";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  TrendingUp,
  Users,
  Briefcase,
  Camera,
  Bell,
  Search,
  LogOut,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

// Mock data for clinical cases
const mockCases = [
  {
    doctorName: "Dr. Ananya Patel",
    specialty: "Endodontist • Mumbai",
    isVerified: true,
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop",
    title: "Complete Root Canal Treatment",
    description: "Successful treatment of a necrotic pulp with periapical pathology. Patient was pain-free within 48 hours.",
    procedure: "RCT",
    likes: 124,
    comments: 18,
    timeAgo: "2 hours ago",
  },
  {
    doctorName: "Dr. Rajesh Kumar",
    specialty: "Orthodontist • Delhi",
    isVerified: true,
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
    title: "Class II Malocclusion Correction",
    description: "18-month treatment with clear aligners. Achieved optimal overjet and overbite correction.",
    procedure: "Orthodontics",
    likes: 89,
    comments: 12,
    timeAgo: "5 hours ago",
  },
];

// Mock data for jobs
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
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate("/auth");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || "Doctor";
  const userType = user?.user_metadata?.user_type || "professional";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Welcome back, {userName.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              {userType === "clinic"
                ? "Manage your clinic and find talented professionals"
                : "Discover opportunities and share your clinical work"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Camera, label: "Your Cases", value: "12", color: "text-primary" },
            { icon: Briefcase, label: "Applications", value: "5", color: "text-amber-600" },
            { icon: Users, label: "Connections", value: "48", color: "text-mint-foreground" },
            { icon: TrendingUp, label: "Profile Views", value: "234", color: "text-purple-600" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card-clinical p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue={userType === "clinic" ? "consultants" : "feed"} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList className="bg-secondary">
              {userType === "professional" ? (
                <>
                  <TabsTrigger value="feed">Case Feed</TabsTrigger>
                  <TabsTrigger value="jobs">Job Matches</TabsTrigger>
                </>
              ) : (
                <>
                  <TabsTrigger value="consultants">Find Consultants</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                </>
              )}
            </TabsList>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-clinical pl-10 py-2 text-sm"
                />
              </div>
              <Button className="btn-trust gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {userType === "clinic" ? "Post Job" : "Add Case"}
                </span>
              </Button>
            </div>
          </div>

          {/* Professional Views */}
          <TabsContent value="feed" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {mockCases.map((caseData, index) => (
                <ClinicalCaseCard key={index} {...caseData} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="grid gap-6">
              {mockJobs.map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          </TabsContent>

          {/* Clinic Views */}
          <TabsContent value="consultants" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {mockCases.map((caseData, index) => (
                <ClinicalCaseCard key={index} {...caseData} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="card-clinical p-8 text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No Applications Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Post a job to start receiving applications from qualified professionals.
              </p>
              <Button className="btn-trust gap-2">
                <Plus className="h-4 w-4" />
                Post Your First Job
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
