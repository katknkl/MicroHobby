"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { getHobbyById, type UserProgress } from "@/lib/hobbies";

// Fixed date for demo purposes - April 6, 2026
const TODAY = new Date("2026-04-06");

interface CompletedEntry {
  date: string;
  hobbyId: string;
  hobbyName: string;
  category: string;
}

interface UserContextType {
  progress: UserProgress;
  completedEntries: CompletedEntry[];
  handleComplete: (id: string) => void;
  handleFavorite: (id: string) => void;
  today: Date;
}

const defaultProgress: UserProgress = {
  hobbiesCompleted: ["origami-crane", "hand-yoga", "watercolor-clouds", "herb-garden", "friendship-bracelet"],
  currentStreak: 5,
  longestStreak: 7,
  favorites: ["origami-crane", "friendship-bracelet"],
  lastActivityDate: TODAY.toISOString(),
  totalMinutes: 145,
};

// Generate demo entries based on the fixed date
const generateDefaultEntries = (): CompletedEntry[] => {
  const entries: CompletedEntry[] = [
    { date: "2026-04-06", hobbyId: "friendship-bracelet", hobbyName: "Friendship Bracelet", category: "Crafts" },
    { date: "2026-04-05", hobbyId: "herb-garden", hobbyName: "Herb Garden", category: "Outdoor" },
    { date: "2026-04-04", hobbyId: "watercolor-clouds", hobbyName: "Watercolor Clouds", category: "Art" },
    { date: "2026-04-03", hobbyId: "hand-yoga", hobbyName: "Hand Yoga", category: "Wellness" },
    { date: "2026-04-02", hobbyId: "origami-crane", hobbyName: "Origami Crane", category: "Crafts" },
    // Gap on April 1
    { date: "2026-03-30", hobbyId: "nature-sketch", hobbyName: "Nature Sketch", category: "Art" },
    { date: "2026-03-29", hobbyId: "simple-cookies", hobbyName: "Simple Cookies", category: "Cooking" },
    { date: "2026-03-28", hobbyId: "meditation", hobbyName: "5-Min Meditation", category: "Wellness" },
    { date: "2026-03-27", hobbyId: "origami-crane", hobbyName: "Origami Crane", category: "Crafts" },
    { date: "2026-03-26", hobbyId: "hand-yoga", hobbyName: "Hand Yoga", category: "Wellness" },
    { date: "2026-03-25", hobbyId: "watercolor-clouds", hobbyName: "Watercolor Clouds", category: "Art" },
    { date: "2026-03-24", hobbyId: "friendship-bracelet", hobbyName: "Friendship Bracelet", category: "Crafts" },
  ];
  return entries;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [completedEntries, setCompletedEntries] = useState<CompletedEntry[]>([]);

  useEffect(() => {
    // Load from localStorage or use defaults
    const savedProgress = localStorage.getItem("microhobby_progress");
    const savedEntries = localStorage.getItem("microhobby_entries");
    
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    
    if (savedEntries) {
      setCompletedEntries(JSON.parse(savedEntries));
    } else {
      const defaultEntries = generateDefaultEntries();
      setCompletedEntries(defaultEntries);
      localStorage.setItem("microhobby_entries", JSON.stringify(defaultEntries));
    }
  }, []);

  // Save to localStorage when progress changes
  useEffect(() => {
    localStorage.setItem("microhobby_progress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (completedEntries.length > 0) {
      localStorage.setItem("microhobby_entries", JSON.stringify(completedEntries));
    }
  }, [completedEntries]);

  const handleComplete = useCallback((id: string) => {
    const hobby = getHobbyById(id);
    if (!hobby) return;

    const todayStr = TODAY.toISOString().split("T")[0];
    
    // Add entry if not already completed today
    const alreadyCompletedToday = completedEntries.some(e => e.date === todayStr);
    
    if (!alreadyCompletedToday) {
      setCompletedEntries(prev => [
        { date: todayStr, hobbyId: id, hobbyName: hobby.name, category: hobby.category },
        ...prev
      ]);
    }

    setProgress((prev) => ({
      ...prev,
      hobbiesCompleted: [...new Set([...prev.hobbiesCompleted, id])],
      currentStreak: prev.currentStreak + 1,
      longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
      totalMinutes: prev.totalMinutes + hobby.duration,
      lastActivityDate: TODAY.toISOString(),
    }));
  }, [completedEntries]);

  const handleFavorite = useCallback((id: string) => {
    setProgress((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(id)
        ? prev.favorites.filter((f) => f !== id)
        : [...prev.favorites, id],
    }));
  }, []);

  return (
    <UserContext.Provider value={{ 
      progress, 
      completedEntries, 
      handleComplete, 
      handleFavorite,
      today: TODAY 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
