"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Leaf, 
  ArrowLeft, 
  Camera, 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  Flame,
  Trophy,
  Clock,
  Heart,
  LogOut,
  Save
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
  joinedAt: string;
  streak: number;
  totalHobbies: number;
  favorites: string[];
  avatar?: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    notifications: true,
    dailyReminders: true,
    weeklyDigest: false,
    darkMode: false,
  });

  useEffect(() => {
    // Load user data from localStorage (demo)
    const userData = localStorage.getItem("microhobby_user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setSettings((prev) => ({
        ...prev,
        name: parsed.name,
        email: parsed.email,
      }));
    } else {
      // Create demo user if none exists
      const demoUser: UserData = {
        name: "Creative Explorer",
        email: "explorer@microhobby.app",
        joinedAt: new Date().toISOString(),
        streak: 5,
        totalHobbies: 12,
        favorites: ["origami-crane", "hand-yoga", "friendship-bracelet"],
      };
      localStorage.setItem("microhobby_user", JSON.stringify(demoUser));
      setUser(demoUser);
      setSettings((prev) => ({
        ...prev,
        name: demoUser.name,
        email: demoUser.email,
      }));
    }
  }, []);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    if (user) {
      const updatedUser = { ...user, name: settings.name, email: settings.email };
      localStorage.setItem("microhobby_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    
    setIsLoading(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to home</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hobby-yellow">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-foreground">Account Settings</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="text-muted-foreground">
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md"
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">Change photo</span>
            </Button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Member since {formatDate(user.joinedAt)}
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 rounded-full bg-hobby-yellow/20 px-4 py-2">
              <Flame className="h-5 w-5 text-hobby-coral" />
              <span className="font-bold">{user.streak}</span>
              <span className="text-sm text-muted-foreground hidden sm:inline">streak</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="font-bold">{user.totalHobbies}</span>
              <span className="text-sm text-muted-foreground hidden sm:inline">hobbies</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={(e) =>
                        setSettings((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) =>
                        setSettings((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <Button onClick={handleSaveProfile} disabled={isLoading}>
                    {isLoading ? (
                      "Saving..."
                    ) : isSaved ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Saved!
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                  {isSaved && (
                    <span className="text-sm text-primary">Changes saved successfully</span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button variant="outline">Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Manage how you receive updates and reminders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about new hobbies and challenges
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({ ...prev, notifications: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Daily Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a gentle nudge to try your daily hobby
                    </p>
                  </div>
                  <Switch
                    checked={settings.dailyReminders}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({ ...prev, dailyReminders: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a summary of your weekly progress
                    </p>
                  </div>
                  <Switch
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({ ...prev, weeklyDigest: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize how MicroHobby looks for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Dark Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Switch to dark theme
                    </p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({ ...prev, darkMode: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy
                </CardTitle>
                <CardDescription>
                  Control your privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your hobby journey
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Streak</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your streak on your public profile
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-hobby-coral/20">
                      <Flame className="h-6 w-6 text-hobby-coral" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.streak}</p>
                      <p className="text-sm text-muted-foreground">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.totalHobbies}</p>
                      <p className="text-sm text-muted-foreground">Hobbies Tried</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-hobby-blue/20">
                      <Clock className="h-6 w-6 text-hobby-blue" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.totalHobbies * 20}</p>
                      <p className="text-sm text-muted-foreground">Minutes Spent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-hobby-pink/20">
                      <Heart className="h-6 w-6 text-hobby-pink" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.favorites.length}</p>
                      <p className="text-sm text-muted-foreground">Favorites</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Achievement Badges</CardTitle>
                <CardDescription>
                  Milestones you have reached on your hobby journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    First Hobby
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    3-Day Streak
                  </Badge>
                  {user.streak >= 7 && (
                    <Badge variant="secondary" className="px-4 py-2 text-sm bg-hobby-yellow/20 text-foreground">
                      Week Warrior
                    </Badge>
                  )}
                  {user.totalHobbies >= 10 && (
                    <Badge variant="secondary" className="px-4 py-2 text-sm bg-primary/20 text-foreground">
                      Hobbyist
                    </Badge>
                  )}
                  <Badge variant="outline" className="px-4 py-2 text-sm opacity-50">
                    30-Day Master (Locked)
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2 text-sm opacity-50">
                    50 Hobbies (Locked)
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
