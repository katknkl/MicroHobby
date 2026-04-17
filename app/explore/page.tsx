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
import { hobbies as baseHobbies, categories, type Hobby } from "@/lib/hobbies";
import { Clock, Search, Heart, Sparkles, Filter, Leaf, Play } from "lucide-react";

// ─── Extra music hobbies injected here (add to your hobbies.ts later) ────────
const extraMusicHobbies: Hobby[] = [
  {
    id: "music-beat-making",
    name: "Beat Making",
    description: "Create a simple drum pattern or lo-fi beat using a free browser DAW. No experience needed — just hit play and layer sounds.",
    category: "music",
    duration: 25,
    difficulty: "easy",
    emoji: "🥁",
    color: "hobby-coral",
    steps: [
      { title: "Open a browser DAW", description: "Go to Soundtrap, BandLab, or Chrome Music Lab and start a new project." },
      { title: "Add a kick drum", description: "Pick a kick sample and place it on beats 1 and 3 of a 4-bar loop." },
      { title: "Layer a snare", description: "Add a snare on beats 2 and 4." },
      { title: "Add hi-hats", description: "Fill in eighth notes with a hi-hat for groove." },
      { title: "Play it back", description: "Hit play, vibe, and tweak until it feels right." },
    ],
    mediaUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80",
    mediaType: "image",
  },
  {
    id: "music-humming-melody",
    name: "Compose a Melody",
    description: "Hum or whistle a short melody into your phone's voice memo app, then try to recreate it on a virtual piano keyboard.",
    category: "music",
    duration: 20,
    difficulty: "easy",
    emoji: "🎵",
    color: "hobby-blue",
    steps: [
      { title: "Record a hum", description: "Open Voice Memos and hum a short 8-note melody that feels good to you." },
      { title: "Open a virtual piano", description: "Try virtualpiano.net or Chrome Music Lab's Song Maker." },
      { title: "Find your notes", description: "Play around to match your hummed melody on the keyboard." },
      { title: "Write it down", description: "Note the key letters (C, D, E…) so you can revisit it later." },
    ],
    mediaUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80",
    mediaType: "image",
  },
  {
    id: "music-air-drumming",
    name: "Air Drumming Session",
    description: "Put on your favorite song and air-drum along with the beat. It's a genuine workout and surprisingly great for rhythm training.",
    category: "music",
    duration: 20,
    difficulty: "easy",
    emoji: "🪘",
    color: "hobby-yellow",
    steps: [
      { title: "Pick a song", description: "Choose something with a clear, driving beat — rock, hip-hop, or funk all work great." },
      { title: "Find your sticks", description: "Use pencils, chopsticks, or just your hands." },
      { title: "Listen for the kick", description: "Tap your foot on the kick drum beat to lock in your timing." },
      { title: "Layer in snare and hi-hat", description: "Add right hand for hi-hat, left for snare — watch a 1-minute tutorial if needed." },
      { title: "Full song round", description: "Play through the whole track without stopping." },
    ],
    mediaUrl: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=600&q=80",
    mediaType: "image",
  },
  {
    id: "music-playlist-curation",
    name: "Playlist Curation",
    description: "Curate the perfect mood playlist from scratch — pick a vibe, research tracks, and craft an arc from opener to closer.",
    category: "music",
    duration: 25,
    difficulty: "easy",
    emoji: "🎧",
    color: "hobby-pink",
    steps: [
      { title: "Choose a mood", description: "Decide on a feeling: 'Sunday morning', 'late-night drive', 'getting pumped up'." },
      { title: "Start with 3 anchors", description: "Pick 3 songs you absolutely love for this mood." },
      { title: "Fill in the gaps", description: "Use Spotify's 'Go to Song Radio' or YouTube's autoplay to discover similar tracks." },
      { title: "Order the arc", description: "Start chill, build to a peak, then wind down — or go the other way." },
      { title: "Give it a name", description: "A great playlist name makes it feel real. Be creative!" },
    ],
    mediaUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    mediaType: "image",
  },
  {
    id: "music-lyric-writing",
    name: "Write Song Lyrics",
    description: "Pick an emotion you've felt recently and write a verse and chorus. Rhyming optional — just let it flow.",
    category: "music",
    duration: 25,
    difficulty: "medium",
    emoji: "✍️",
    color: "hobby-green",
    steps: [
      { title: "Pick your feeling", description: "Choose one emotion: nostalgia, excitement, heartbreak, relief — whatever is fresh." },
      { title: "Free-write for 5 minutes", description: "Write every word or phrase associated with that feeling. Don't edit yet." },
      { title: "Shape a verse", description: "Pick the best lines and arrange them into 4–6 line verse." },
      { title: "Write a chorus", description: "The chorus is the hook — make it memorable and singable." },
      { title: "Read it aloud", description: "Read your lyrics out loud to hear how they flow." },
    ],
    mediaUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
    mediaType: "image",
  },
];

// ─── Photo map for existing hobbies (keyed by hobby id) ──────────────────────
// Add Unsplash images for existing hobby IDs from your hobbies.ts here.
// These are illustrative — update the keys to match your actual hobby IDs.
const hobbyImageMap: Record<string, string> = {
  // Creative
  "watercolor-painting": "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&q=80",
  "zentangle": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
  "origami": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
  "journaling": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80",
  "collage": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  // Outdoor
  "birdwatching": "https://images.unsplash.com/photo-1444464948136-4bfa4d4d4e12?w=600&q=80",
  "nature-sketching": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80",
  "cloud-watching": "https://images.unsplash.com/photo-1535557686168-82f2d764ef5a?w=600&q=80",
  // Cooking
  "smoothie-art": "https://images.unsplash.com/photo-1622597467836-f3e6c08d68f0?w=600&q=80",
  "spice-blending": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
  // Mindfulness
  "meditation": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
  "breathing-exercises": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
};

// Merge base hobbies (with image injection) + extra music hobbies
const hobbies: Hobby[] = [
  ...baseHobbies.map((h) =>
    hobbyImageMap[h.id] ? { ...h, mediaUrl: hobbyImageMap[h.id], mediaType: "image" as const } : h
  ),
  ...extraMusicHobbies,
];

export default function ExplorePage() {
  const searchParams = useSearchParams();

  // ── Deep-link support: ?category=music&scroll=music-beat-making ──────────
  const initialCategory = searchParams.get("category");
  const initialScrollTo = searchParams.get("scroll");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completedHobbies, setCompletedHobbies] = useState<string[]>([]);

  // Refs for deep-linking to a specific card
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll to a specific hobby card after mount (used by "Find Your Inspiration" links)
  useEffect(() => {
    if (!initialScrollTo) return;
    const timeout = setTimeout(() => {
      const el = cardRefs.current[initialScrollTo];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // Briefly highlight the card
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
              {/* ── Media (photo or video thumbnail) ── */}
              {hobby.mediaUrl && (
                <div className="relative w-full h-40 overflow-hidden bg-muted">
                  <img
                    src={hobby.mediaUrl}
                    alt={hobby.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {hobby.mediaType === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow">
                        <Play className="h-5 w-5 text-foreground fill-current ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${colorMap[hobby.color] ?? "bg-muted"}`}
                  >
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
                    <Heart
                      className={`h-5 w-5 ${favorites.includes(hobby.id) ? "fill-current" : ""}`}
                    />
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
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
            >
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
