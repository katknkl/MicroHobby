"use client";

import { Card } from "@/components/ui/card";
import { Check, Flame } from "lucide-react";

interface WeeklyCalendarProps {
  completedDays: boolean[];
  currentStreak: number;
}

export function WeeklyCalendar({ completedDays, currentStreak }: WeeklyCalendarProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1; // Adjust for Monday start

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">This Week</h3>
        <div className="flex items-center gap-1.5 text-sm">
          <Flame className="h-4 w-4 text-hobby-coral" />
          <span className="font-bold">{currentStreak}</span>
          <span className="text-muted-foreground">day streak</span>
        </div>
      </div>
      
      <div className="flex justify-center gap-4 sm:gap-6">
        {days.map((day, index) => {
          const isToday = index === todayIndex;
          const isCompleted = completedDays[index];
          const isPast = index < todayIndex;
          
          return (
            <div key={day} className="flex flex-col items-center gap-2">
              <span className={`text-xs font-medium ${isToday ? "text-primary" : "text-muted-foreground"}`}>
                {day}
              </span>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                  isCompleted
                    ? "bg-hobby-green text-white"
                    : isToday
                    ? "bg-primary/20 border-2 border-primary text-primary"
                    : isPast
                    ? "bg-muted text-muted-foreground"
                    : "bg-muted/50 text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Motivational message */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground text-center">
          {currentStreak >= 7 
            ? "Incredible! A full week of creativity!" 
            : currentStreak >= 3 
            ? "You're on a roll! Keep it up!" 
            : "Every hobby counts. Start today!"}
        </p>
      </div>
    </Card>
  );
}
