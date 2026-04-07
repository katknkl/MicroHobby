"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TutorialModal } from "@/components/tutorial-modal";
import { hobbies, type Hobby } from "@/lib/hobbies";
import { Clock, Search, BookOpen, Play, CheckCircle2, Leaf } from "lucide-react";

export default function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completedHobbies, setCompletedHobbies] = useState<string[]>([]);

  const filteredHobbies = hobbies.filter((hobby) => {
    const matchesDifficulty = !selectedDifficulty || hobby.difficulty === selectedDifficulty;
    const matchesSearch = hobby.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hobby.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const handleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleComplete = (id: string) => {
    if (!completedHobbies.includes(id)) {
      setCompletedHobbies(prev => [...prev, id]);
    }
  };

  const colorMap: Record<string, string> = {
    "hobby-coral": "bg-hobby-coral/20",
    "hobby-blue": "bg-hobby-blue/20",
    "hobby-green": "bg-hobby-green/20",
    "hobby-yellow": "bg-hobby-yellow/20",
    "hobby-pink": "bg-hobby-pink/20",
  };

  const difficultyColors: Record<string, string> = {
    easy: "bg-hobby-green/20 text-hobby-green border-hobby-green/30",
    medium: "bg-hobby-yellow/20 text-foreground border-hobby-yellow/30",
    hard: "bg-hobby-coral/20 text-hobby-coral border-hobby-coral/30",
  };

  // Group by difficulty for featured sections
  const easyHobbies = hobbies.filter(h => h.difficulty === "easy");
  const mediumHobbies = hobbies.filter(h => h.difficulty === "medium");

  return (
    <div className="min-h-screen bg-background">
      <Header currentStreak={5} />

      <main className="container max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-hobby-blue/20">
              <BookOpen className="h-6 w-6 text-hobby-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tutorials</h1>
              <p className="text-muted-foreground">Step-by-step guides for every hobby</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedDifficulty === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDifficulty(null)}
            className="rounded-full"
          >
            All Levels
          </Button>
          <Button
            variant={selectedDifficulty === "easy" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDifficulty("easy")}
            className="rounded-full gap-1.5"
          >
            Beginner Friendly
          </Button>
          <Button
            variant={selectedDifficulty === "medium" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDifficulty("medium")}
            className="rounded-full gap-1.5"
          >
            Intermediate
          </Button>
          <Button
            variant={selectedDifficulty === "hard" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDifficulty("hard")}
            className="rounded-full gap-1.5"
          >
            Challenge Me
          </Button>
        </div>

        {/* Quick Start Section */}
        {!selectedDifficulty && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Play className="h-5 w-5 text-hobby-green" />
              Quick Start - Under 15 Minutes
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {easyHobbies.slice(0, 4).map((hobby) => (
                <Card 
                  key={hobby.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedHobby(hobby)}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl mb-3 ${colorMap[hobby.color]}`}>
                    {hobby.emoji}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{hobby.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {hobby.duration} min
                    <span className="text-hobby-green">Easy</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Tutorials */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            {selectedDifficulty || searchQuery ? "Results" : "All Tutorials"}
          </h2>
          <div className="space-y-3">
            {filteredHobbies.map((hobby) => (
              <Card 
                key={hobby.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedHobby(hobby)}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shrink-0 ${colorMap[hobby.color]}`}>
                    {hobby.emoji}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-foreground">{hobby.name}</h3>
                      {completedHobbies.includes(hobby.id) && (
                        <CheckCircle2 className="h-4 w-4 text-hobby-green" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{hobby.description}</p>
                  </div>

                  <div className="hidden sm:flex items-center gap-3 shrink-0">
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {hobby.duration} min
                    </Badge>
                    <Badge className={difficultyColors[hobby.difficulty]}>
                      {hobby.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {hobby.steps.length} steps
                    </Badge>
                  </div>

                  <Button size="sm" className="shrink-0">
                    <Play className="h-4 w-4 mr-1" />
                    Start
                  </Button>
                </div>

                {/* Mobile badges */}
                <div className="flex sm:hidden items-center gap-2 mt-3 pt-3 border-t">
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <Clock className="h-3 w-3" />
                    {hobby.duration} min
                  </Badge>
                  <Badge className={`text-xs ${difficultyColors[hobby.difficulty]}`}>
                    {hobby.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {hobby.steps.length} steps
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {filteredHobbies.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No tutorials found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter</p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedDifficulty(null); }}>
              Clear filters
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hobby-yellow">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-foreground">MicroHobby</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Learn something new in just 20 minutes.
            </p>
          </div>
        </div>
      </footer>

      {/* Tutorial Modal */}
      <TutorialModal
        hobby={selectedHobby}
        isOpen={!!selectedHobby}
        onClose={() => setSelectedHobby(null)}
        onComplete={handleComplete}
        onFavorite={handleFavorite}
        isFavorite={selectedHobby ? favorites.includes(selectedHobby.id) : false}
      />
    </div>
  );
}
