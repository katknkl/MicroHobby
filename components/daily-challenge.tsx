"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Sparkles, ChevronRight, RefreshCw, Heart } from "lucide-react";
import type { Hobby } from "@/lib/hobbies";

interface DailyChallengeProps {
  hobby: Hobby;
  onComplete: (id: string) => void;
  onSkip: () => void;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
}

export function DailyChallenge({ hobby, onComplete, onSkip, onFavorite, isFavorite }: DailyChallengeProps) {
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const difficultyColors = {
    easy: "bg-hobby-green/20 text-hobby-green",
    medium: "bg-hobby-yellow/20 text-hobby-coral",
    hard: "bg-hobby-coral/20 text-hobby-coral",
  };

  const handleNextStep = () => {
    if (currentStep < hobby.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(hobby.id);
    }
  };

  return (
    <Card className="relative overflow-hidden border-2 border-primary/20 bg-card">
      {/* Header accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />
      
      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-hobby-yellow/30 text-2xl">
              {hobby.emoji}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                Today&apos;s Challenge
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mt-0.5 text-balance">
                {hobby.name}
              </h2>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onFavorite(hobby.id)}
            className={isFavorite ? "text-hobby-coral" : "text-muted-foreground"}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
          </Button>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            {hobby.duration} min
          </Badge>
          <Badge className={difficultyColors[hobby.difficulty]}>
            {hobby.difficulty}
          </Badge>
          {hobby.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 text-pretty text-sm">{hobby.description}</p>

        {/* Materials */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold mb-2 text-foreground">What you&apos;ll need:</h3>
          <ul className="grid grid-cols-2 gap-2">
            {hobby.materials.map((material, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                {material}
              </li>
            ))}
          </ul>
        </div>

        {/* Steps Section */}
        {showSteps ? (
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / hobby.steps.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {currentStep + 1}/{hobby.steps.length}
              </span>
            </div>

            {/* Current step */}
            <div className="bg-muted/50 rounded-xl p-4">
              <p className="text-xs font-medium text-primary mb-1">Step {currentStep + 1}</p>
              <p className="text-foreground font-medium">{hobby.steps[currentStep]}</p>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="flex-1"
              >
                Previous
              </Button>
              <Button 
                onClick={handleNextStep}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {currentStep === hobby.steps.length - 1 ? "Complete!" : "Next Step"}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        ) : (
          /* Action buttons */
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              size="lg"
              onClick={() => setShowSteps(true)}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start Challenge
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onSkip}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Skip
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
