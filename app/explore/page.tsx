"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TutorialModal } from "@/components/tutorial-modal";
import { hobbies, categories, type Hobby } from "@/lib/hobbies";
import { Clock, Search, Heart, Sparkles, Filter, Leaf } from "lucide-react";

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialScrollTo = searchParams.get("scroll");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completedHobbies, setCompletedHobbies] = useState<string[]>([]);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!initialScrollTo) return;
    const timeout = setTimeout(() => {
      const el = cardRefs.current[initialScrollTo];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-2", "ring-primary", "ring-offset-2");
        setTimeout(() => el.classList.remove("ring-2", "ring-primary", "ring-offset-2"), 2000);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [initialScrollTo]);

  const filteredHobbies = hobbies.filter((hobby) => {
    const matchesCategory = !selectedCategory || hobby.category === selectedCategory;
    const matchesSearch =
      hobby.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hobby.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleComplete = (id: string) => {
    if (!completedHobbies.includes(id)) {
      setCompletedHobbies((prev) => [...prev, id]);
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
    easy: "bg-hobby-green/20 text-hobby-green",
    medium: "bg-hobby-yellow/20 text-foreground",
    hard: "bg-hobby-coral/20 text-hobby-coral",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentStreak={5} />

      <main className="container max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Explore Hobbies</h1>
              <p className="text-muted-foreground">Discover new activities to try in 20-30 minutes</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search hobbies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter:</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full gap-1.5"
            >
              <span>{category.emoji}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredHobbies.length} {filteredHobbies.length === 1 ? "hobby" : "hobbies"}
        </p>

        {/* Hobby Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHobbies.map((hobby) => (
            <Card
              key={hobby.id}
              ref={(el) => { cardRefs.current[hobby.id] = el; }}
              className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
            >
              {/* Photo */}
              {hobby.mediaUrl && (
                <div className="w-full h-40 overflow-hidden bg-muted">
                  <img
                    src={hobby.mediaUrl}
                    alt={hobby.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${colorMap[hobby.color] ?? "bg-muted"}`}>
                    {hobby.emoji}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(hobby.id);
                    }}
                    className={
                      favorites.includes(hobby.id)
                        ? "text-hobby-coral"
                        : "text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    }
                  >
                    <Heart className={`h-5 w-5 ${favorites.includes(hobby.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <h3 className="font-bold text-lg text-foreground mb-1">{hobby.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{hobby.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <Clock className="h-3 w-3" />
                    {hobby.duration} min
                  </Badge>
                  <Badge className={`text-xs ${difficultyColors[hobby.difficulty]}`}>
                    {hobby.difficulty}
                  </Badge>
                  {completedHobbies.includes(hobby.id) && (
                    <Badge className="bg-hobby-green/20 text-hobby-green text-xs">
                      Completed
                    </Badge>
                  )}
                </div>

                <Button className="w-full" onClick={() => setSelectedHobby(hobby)}>
                  Start Activity
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredHobbies.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No hobbies found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter</p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}>
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
              Try something new today. Your next favorite hobby is waiting.
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
