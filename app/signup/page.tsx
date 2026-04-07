"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf, ArrowRight, Sparkles } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate account creation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Store user data in localStorage for demo purposes
    localStorage.setItem("microhobby_user", JSON.stringify({
      name: formData.name,
      email: formData.email,
      joinedAt: new Date().toISOString(),
      streak: 0,
      totalHobbies: 0,
      favorites: [],
    }));
    
    setIsLoading(false);
    router.push("/account");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container max-w-6xl mx-auto flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-hobby-yellow">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">MicroHobby</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Start your creative journey</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
            <p className="text-muted-foreground">
              Join thousands discovering new hobbies every day
            </p>
          </div>

          {/* Signup Card */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Sign up</CardTitle>
              <CardDescription>
                Enter your details to create your MicroHobby account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                    required
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                    I agree to the{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading || !formData.agreeToTerms}
                >
                  {isLoading ? (
                    "Creating account..."
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-xs text-muted-foreground">Micro hobbies</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-hobby-coral">20 min</div>
              <div className="text-xs text-muted-foreground">Average time</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-hobby-blue">Free</div>
              <div className="text-xs text-muted-foreground">Forever</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
