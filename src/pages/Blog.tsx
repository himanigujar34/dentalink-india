import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogPostCard } from "@/components/BlogPostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  PenSquare,
  BookOpen,
  TrendingUp,
  Newspaper,
  GraduationCap,
} from "lucide-react";

// Mock blog posts
const mockPosts = [
  {
    id: "1",
    title: "Latest Advances in CAD/CAM Dentistry: A 2024 Review",
    excerpt:
      "Digital dentistry has revolutionized the way we approach restorative procedures. In this comprehensive review, we explore the latest CAD/CAM technologies...",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop",
    authorName: "Dr. Vikram Mehta",
    authorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop",
    authorSpecialty: "Prosthodontist",
    publishedAt: "2 days ago",
    readTime: "8 min read",
    category: "Technology",
    likes: 245,
    comments: 32,
    isOfficial: true,
  },
  {
    id: "2",
    title: "Managing Dental Anxiety in Pediatric Patients",
    excerpt:
      "Dental anxiety in children can be challenging for both practitioners and parents. Learn evidence-based techniques to create a positive experience...",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop",
    authorName: "Dr. Priya Sharma",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
    authorSpecialty: "Pediatric Dentist",
    publishedAt: "5 days ago",
    readTime: "6 min read",
    category: "Clinical",
    likes: 189,
    comments: 24,
    isOfficial: false,
  },
  {
    id: "3",
    title: "Regenerative Endodontics: Future of Pulp Therapy",
    excerpt:
      "The field of regenerative endodontics offers exciting possibilities for treating immature permanent teeth with pulp necrosis...",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop",
    authorName: "Dr. Rajesh Kumar",
    authorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop",
    authorSpecialty: "Endodontist",
    publishedAt: "1 week ago",
    readTime: "10 min read",
    category: "Research",
    likes: 312,
    comments: 45,
    isOfficial: false,
  },
  {
    id: "4",
    title: "DentaLink India Launches New Features for Clinic Owners",
    excerpt:
      "We're excited to announce new features designed specifically for clinic owners, including advanced consultant matching and scheduling tools...",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
    authorName: "DentaLink Team",
    authorAvatar: "",
    authorSpecialty: "Official Update",
    publishedAt: "3 days ago",
    readTime: "3 min read",
    category: "Updates",
    likes: 156,
    comments: 18,
    isOfficial: true,
  },
  {
    id: "5",
    title: "Setting Up Your First Dental Clinic in India: A Complete Guide",
    excerpt:
      "From licensing requirements to equipment selection, this guide covers everything you need to know about starting a dental practice in India...",
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=400&fit=crop",
    authorName: "Dr. Ananya Patel",
    authorAvatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop",
    authorSpecialty: "Practice Management",
    publishedAt: "2 weeks ago",
    readTime: "15 min read",
    category: "Business",
    likes: 423,
    comments: 67,
    isOfficial: false,
  },
  {
    id: "6",
    title: "Understanding Clear Aligner Therapy: Case Selection Criteria",
    excerpt:
      "Not every malocclusion is suitable for clear aligners. Learn how to select appropriate cases and set realistic patient expectations...",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop",
    authorName: "Dr. Siddharth Jain",
    authorAvatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&h=100&fit=crop",
    authorSpecialty: "Orthodontist",
    publishedAt: "1 week ago",
    readTime: "7 min read",
    category: "Clinical",
    likes: 278,
    comments: 38,
    isOfficial: false,
  },
];

const categories = [
  { id: "all", label: "All Posts", icon: BookOpen },
  { id: "updates", label: "Updates", icon: Newspaper },
  { id: "clinical", label: "Clinical", icon: GraduationCap },
  { id: "trending", label: "Trending", icon: TrendingUp },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "updates" && post.isOfficial) ||
      (activeCategory === "trending" && post.likes > 200) ||
      post.category.toLowerCase() === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              DentaLink Blog
            </h1>
            <p className="text-muted-foreground mt-1">
              Insights, updates, and advances in dentistry
            </p>
          </div>
          <Button className="btn-trust gap-2">
            <PenSquare className="h-4 w-4" />
            Write Article
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-clinical pl-10"
          />
        </div>

        {/* Category Tabs */}
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-8"
        >
          <TabsList className="bg-secondary">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Featured Post (First Post) */}
        {filteredPosts.length > 0 && activeCategory === "all" && (
          <div className="mb-8">
            <BlogPostCard {...filteredPosts[0]} featured />
          </div>
        )}

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === "all" ? filteredPosts.slice(1) : filteredPosts).map(
              (post) => (
                <BlogPostCard key={post.id} {...post} />
              )
            )}
          </div>
        ) : (
          <div className="card-clinical p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              No Articles Found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
