"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Heart, Check, ChevronRight } from "lucide-react";
import type { Hobby } from "@/lib/hobbies";

interface HobbyCardProps {
  hobby: Hobby;
  isCompleted: boolean;
  isFavorite: boolean;
  onSelect: (id: string) => void;
  onFavorite: (id: string) => void;
}

export function HobbyCard({ hobby, isCompleted, isFavorite, onSelect, onFavorite }: HobbyCardProps) {
  const colorMap: Record<string, string> = {
    "hobby-coral": "bg-hobby-coral/10",
    "hobby-blue": "bg-hobby-blue/10",
    "hobby-green": "bg-hobby-green/10",
    "hobby-yellow": "bg-hobby-yellow/10",
    "hobby-pink": "bg-hobby-pink/10",
  };

  const difficultyColors = {
    easy: "bg-hobby-green/20 text-hobby-green",
    medium: "bg-hobby-yellow/30 text-hobby-coral",
    hard: "bg-hobby-coral/20 text-hobby-coral",
  };

  return (
    <Card className={`group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${isCompleted ? "opacity-75" : ""}`}>
      {/* Completed indicator */}
      {isCompleted && (
        <div className="absolute top-3 left-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-hobby-green text-white">
          <Check className="h-4 w-4" />
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${colorMap[hobby.color]}`}>
            {hobby.emoji}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(hobby.id);
            }}
            className={`h-8 w-8 ${isFavorite ? "text-hobby-coral" : "text-muted-foreground opacity-0 group-hover:opacity-100"}`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
          </Button>
        </div>

        {/* Title */}
        <h3 className="font-bold text-foreground mb-2 text-balance">{hobby.name}</h3>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="gap-1 text-xs">
            <Clock className="h-3 w-3" />
            {hobby.duration}m
          </Badge>
          <Badge className={`text-xs ${difficultyColors[hobby.difficulty]}`}>
            {hobby.difficulty}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{hobby.description}</p>

        {/* Action */}
        <Button 
          variant="ghost" 
          className="w-full justify-between text-primary hover:text-primary hover:bg-primary/10"
          onClick={() => onSelect(hobby.id)}
        >
          {isCompleted ? "Try Again" : "Start Activity"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
