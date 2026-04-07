"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/lib/user-context";
import { 
  Leaf, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  Check,
  Trophy,
  Sparkles
} from "lucide-react";

const categoryColors: Record<string, string> = {
  Crafts: "bg-hobby-coral/20 text-hobby-coral",
  Art: "bg-hobby-blue/20 text-hobby-blue",
  Outdoor: "bg-primary/20 text-primary",
  Cooking: "bg-hobby-yellow/30 text-yellow-700",
  Wellness: "bg-hobby-pink/20 text-hobby-pink",
  Music: "bg-purple-100 text-purple-600",
};

export default function CalendarPage() {
  const { progress, completedEntries, today } = useUser();
  const [currentDate, setCurrentDate] = useState(new Date(today));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const entriesByDate = useMemo(() => {
    const map = new Map<string, { date: string; hobbyId: string; hobbyName: string; category: string }>();
    completedEntries.forEach((entry) => {
      map.set(entry.date, entry);
    });
    return map;
  }, [completedEntries]);

  // Use streak from shared context
  const currentStreak = progress.currentStreak;
  const longestStreak = progress.longestStreak;

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Adjust for Monday start (0 = Monday, 6 = Sunday)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date(today));
    setSelectedDate(today.toISOString().split("T")[0]);
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getDateString = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.toISOString().split("T")[0];
  };

  const selectedEntry = selectedDate ? entriesByDate.get(selectedDate) : null;

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
              <span className="font-bold text-foreground">Streak Calendar</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 rounded-full bg-hobby-yellow/20 px-4 py-2">
            <Flame className="h-5 w-5 text-hobby-coral" />
            <span className="font-bold">{currentStreak}</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">day streak</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex flex-col items-center">
                <Flame className="h-8 w-8 text-hobby-coral mb-2" />
                <p className="text-3xl font-bold">{currentStreak}</p>
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex flex-col items-center">
                <Trophy className="h-8 w-8 text-hobby-yellow mb-2" />
                <p className="text-3xl font-bold">{longestStreak}</p>
                <p className="text-sm text-muted-foreground">Longest Streak</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex flex-col items-center">
                <Check className="h-8 w-8 text-primary mb-2" />
                <p className="text-3xl font-bold">{completedEntries.length}</p>
                <p className="text-sm text-muted-foreground">Total Days</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex flex-col items-center">
                <Sparkles className="h-8 w-8 text-hobby-blue mb-2" />
                <p className="text-3xl font-bold">{completedEntries.length * 20}</p>
                <p className="text-sm text-muted-foreground">Minutes</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Previous month</span>
                  </Button>
                  <CardTitle className="text-xl">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={goToNextMonth}>
                    <ChevronRight className="h-5 w-5" />
                    <span className="sr-only">Next month</span>
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={goToToday}>
                  Today
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the first of the month */}
                {Array.from({ length: adjustedFirstDay }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const dateStr = getDateString(day);
                  const entry = entriesByDate.get(dateStr);
                  const isSelected = selectedDate === dateStr;
                  const isTodayDate = isToday(day);

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`
                        aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all
                        ${entry ? "bg-primary/20 hover:bg-primary/30" : "hover:bg-muted"}
                        ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}
                        ${isTodayDate && !entry ? "border-2 border-primary" : ""}
                      `}
                    >
                      <span className={`font-medium ${entry ? "text-primary" : ""} ${isTodayDate ? "text-primary font-bold" : ""}`}>
                        {day}
                      </span>
                      {entry && (
                        <Check className="h-3 w-3 text-primary mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-primary/20" />
                  <span className="text-sm text-muted-foreground">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded border-2 border-primary" />
                  <span className="text-sm text-muted-foreground">Today</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Day Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedDate
                  ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "Select a Day"}
              </CardTitle>
              <CardDescription>
                {selectedEntry
                  ? "Hobby completed on this day"
                  : selectedDate
                  ? "No hobby completed"
                  : "Click on a day to see details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedEntry ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {selectedEntry.hobbyName}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`mt-1 ${categoryColors[selectedEntry.category] || ""}`}
                      >
                        {selectedEntry.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>Great job completing this hobby!</p>
                    <p className="mt-2">
                      Keep up the momentum and try something new today.
                    </p>
                  </div>

                  <Link href="/">
                    <Button className="w-full" variant="outline">
                      Try Another Hobby
                    </Button>
                  </Link>
                </div>
              ) : selectedDate ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted-foreground/10">
                      <Sparkles className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">
                        No activity recorded
                      </p>
                    </div>
                  </div>

                  {new Date(selectedDate) <= new Date() && (
                    <Link href="/">
                      <Button className="w-full">
                        Start a Hobby Now
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                    <Sparkles className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Select a day on the calendar to view your hobby activity
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Motivational Section */}
        <Card className="mt-6">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-hobby-yellow/20">
                  <Flame className="h-7 w-7 text-hobby-coral" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg">
                    {currentStreak >= 7
                      ? "You are on fire! Keep the momentum going!"
                      : currentStreak >= 3
                      ? "Great progress! You are building a habit."
                      : "Every day counts. Start your streak today!"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentStreak > 0
                      ? `You have completed hobbies for ${currentStreak} day${currentStreak > 1 ? "s" : ""} in a row`
                      : "Complete today's hobby to start your streak"}
                  </p>
                </div>
              </div>
              <Link href="/">
                <Button size="lg">
                  {"Today's Hobby"}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
