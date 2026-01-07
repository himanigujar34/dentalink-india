import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Stethoscope,
  Building2,
  Users,
  Package,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type UserType = "professional" | "clinic" | "distributor";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [mode, setMode] = useState<"signin" | "signup">(
    searchParams.get("mode") === "signup" ? "signup" : "signin"
  );
  const [userType, setUserType] = useState<UserType>(
    (searchParams.get("type") as UserType) || "professional"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dciNumber, setDciNumber] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate("/dashboard");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const redirectUrl = `${window.location.origin}/dashboard`;
        
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
              user_type: userType,
              dci_number: userType === "professional" ? dciNumber : null,
              clinic_name: userType === "clinic" ? clinicName : null,
              company_name: userType === "distributor" ? companyName : null,
              gst_number: userType === "distributor" ? gstNumber : null,
            },
          },
        });

        if (signUpError) throw signUpError;

        toast({
          title: "Account created!",
          description: "Welcome to DentaLink India. Your account is ready.",
        });
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
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

          <h1 className="text-2xl font-display font-bold text-foreground">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {mode === "signup"
              ? "Join India's trusted dental network"
              : "Sign in to continue to DentaLink"}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection (Signup only) */}
            {mode === "signup" && (
              <div className="space-y-3">
                <Label>I am a</Label>
                <RadioGroup
                  value={userType}
                  onValueChange={(value) => setUserType(value as UserType)}
                  className="grid grid-cols-3 gap-3"
                >
                  <Label
                    htmlFor="professional"
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      userType === "professional"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem
                      value="professional"
                      id="professional"
                      className="sr-only"
                    />
                    <Users className="h-6 w-6 text-primary" />
                    <span className="font-medium text-xs text-center">Dental Professional</span>
                  </Label>
                  <Label
                    htmlFor="clinic"
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      userType === "clinic"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem
                      value="clinic"
                      id="clinic"
                      className="sr-only"
                    />
                    <Building2 className="h-6 w-6 text-primary" />
                    <span className="font-medium text-xs text-center">Clinic Owner</span>
                  </Label>
                  <Label
                    htmlFor="distributor"
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      userType === "distributor"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem
                      value="distributor"
                      id="distributor"
                      className="sr-only"
                    />
                    <Package className="h-6 w-6 text-primary" />
                    <span className="font-medium text-xs text-center">Distributor</span>
                  </Label>
                </RadioGroup>
              </div>
            )}

            {/* Conditional Fields for Signup */}
            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Priya Sharma"
                    className="input-clinical"
                    required
                  />
                </div>

                {userType === "professional" && (
                  <div className="space-y-2">
                    <Label htmlFor="dciNumber">DCI Registration Number</Label>
                    <Input
                      id="dciNumber"
                      type="text"
                      value={dciNumber}
                      onChange={(e) => setDciNumber(e.target.value)}
                      placeholder="e.g., A-12345"
                      className="input-clinical"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Your profile will show "Pending Verification" until verified.
                    </p>
                  </div>
                )}
                
                {userType === "clinic" && (
                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic Name</Label>
                    <Input
                      id="clinicName"
                      type="text"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      placeholder="e.g., Smile Care Dental Clinic"
                      className="input-clinical"
                      required
                    />
                  </div>
                )}

                {userType === "distributor" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g., MedSupply India Pvt Ltd"
                        className="input-clinical"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gstNumber">GST Number</Label>
                      <Input
                        id="gstNumber"
                        type="text"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
                        placeholder="e.g., 22AAAAA0000A1Z5"
                        className="input-clinical"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Required for selling products on the marketplace.
                      </p>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-clinical"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-clinical pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full btn-trust py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : mode === "signup" ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Toggle Mode */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="font-medium text-primary hover:underline"
                >
                  Create one
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary to-primary/80 items-center justify-center p-12">
        <div className="max-w-md text-center text-primary-foreground">
          <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-8">
            <Stethoscope className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">
            Join India's Largest Dental Network
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Connect with 5,000+ verified dental professionals, discover job
            opportunities, and grow your practice with DentaLink India.
          </p>
        </div>
      </div>
    </div>
  );
}
