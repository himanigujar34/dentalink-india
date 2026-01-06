import { Link } from "react-router-dom";
import { Stethoscope, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background/90">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Stethoscope className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-background">
                  DentaLink
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-background/60">
                  India
                </span>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              Connecting India's dental community. Find jobs, share cases, and
              grow your practice.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">For Professionals</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link to="/find-work" className="hover:text-background transition-colors">
                  Find Work
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-background transition-colors">
                  Build Portfolio
                </Link>
              </li>
              <li>
                <Link to="/messages" className="hover:text-background transition-colors">
                  Networking
                </Link>
              </li>
            </ul>
          </div>

          {/* For Clinics */}
          <div>
            <h4 className="font-semibold text-background mb-4">For Clinics</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link to="/post-job" className="hover:text-background transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/find-consultants" className="hover:text-background transition-colors">
                  Find Consultants
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="hover:text-background transition-colors">
                  Equipment Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-background mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@dentalink.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © 2026 DentaLink India. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/50">
            <Link to="/privacy" className="hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-background transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
