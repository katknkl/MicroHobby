"use client";

import { Card } from "@/components/ui/card";
import { Flame, Trophy, Clock, Star } from "lucide-react";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  totalMinutes: number;
  hobbiesCompleted: number;
}

export function StreakCard({ currentStreak, longestStreak, totalMinutes, hobbiesCompleted }: StreakCardProps) {
  const stats = [
    {
      icon: Flame,
      value: currentStreak,
      label: "Current Streak",
      suffix: "days",
      color: "text-hobby-coral",
      bgColor: "bg-hobby-coral/10",
    },
    {
      icon: Trophy,
      value: longestStreak,
      label: "Best Streak",
      suffix: "days",
      color: "text-hobby-yellow",
      bgColor: "bg-hobby-yellow/10",
    },
    {
      icon: Clock,
      value: totalMinutes,
      label: "Time Spent",
      suffix: "min",
      color: "text-hobby-blue",
      bgColor: "bg-hobby-blue/10",
    },
    {
      icon: Star,
      value: hobbiesCompleted,
      label: "Completed",
      suffix: "hobbies",
      color: "text-hobby-green",
      bgColor: "bg-hobby-green/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 md:p-5">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.suffix}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
