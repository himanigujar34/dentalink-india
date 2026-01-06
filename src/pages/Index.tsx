import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import {
  Stethoscope,
  Building2,
  Users,
  Briefcase,
  Camera,
  MessageCircle,
  BadgeCheck,
  ChevronRight,
  ArrowRight,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Clinical Portfolio",
    description:
      "Showcase your best work with before/after case studies that build trust and credibility.",
  },
  {
    icon: Briefcase,
    title: "Smart Job Matching",
    description:
      "Find opportunities filtered by location, compensation split, and clinic equipment.",
  },
  {
    icon: MessageCircle,
    title: "Direct Networking",
    description:
      "Connect directly with clinics and professionals. No middlemen, just dentists.",
  },
  {
    icon: Shield,
    title: "DCI Verified",
    description:
      "Every professional is verified with their DCI registration number for trust.",
  },
];

const stats = [
  { value: "5,000+", label: "Verified Dentists" },
  { value: "1,200+", label: "Partner Clinics" },
  { value: "500+", label: "Monthly Jobs" },
  { value: "28", label: "States Covered" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-foreground">
                DentaLink
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                India
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" className="text-muted-foreground">
                Sign In
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button className="btn-trust hidden sm:flex">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint text-mint-foreground text-sm font-medium animate-fade-in">
              <BadgeCheck className="h-4 w-4" />
              <span>India's Trusted Dental Network</span>
            </div>

            <h1
              className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Connect. Collaborate.{" "}
              <span className="gradient-text">Grow Your Practice.</span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              The professional network built exclusively for India's dental
              community. Find jobs, share clinical cases, and connect with clinics
              and specialists.
            </p>

            {/* Dual Login Entry */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Link to="/auth?mode=signup&type=professional">
                <Button
                  size="lg"
                  className="btn-trust w-full sm:w-auto gap-2 text-base px-8 py-6"
                >
                  <Users className="h-5 w-5" />
                  I'm a Dental Professional
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth?mode=signup&type=clinic">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 text-base px-8 py-6 border-2 hover:bg-secondary"
                >
                  <Building2 className="h-5 w-5" />
                  I'm a Clinic Owner
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Everything You Need to Thrive
            </h2>
            <p className="text-muted-foreground mt-4">
              Built specifically for Indian dental professionals and clinics with
              features that matter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="card-clinical p-6 space-y-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Get Started in Minutes
            </h2>
            <p className="text-muted-foreground mt-4">
              Join thousands of dental professionals already growing their careers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description:
                  "Sign up with your DCI registration number and build your professional profile.",
              },
              {
                step: "02",
                title: "Showcase Your Work",
                description:
                  "Upload clinical cases to build your portfolio and attract opportunities.",
              },
              {
                step: "03",
                title: "Connect & Grow",
                description:
                  "Find jobs, connect with clinics, and expand your professional network.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center card-clinical p-8 md:p-12 bg-gradient-to-br from-primary/5 to-mint/20">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Ready to Join India's Dental Network?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Whether you're looking for your next opportunity or need to hire
              talented professionals, DentaLink has you covered.
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="btn-trust gap-2 text-base px-8 py-6">
                Create Free Account
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
