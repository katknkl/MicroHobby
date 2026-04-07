"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Heart, Check, ChevronLeft, ChevronRight, X, PartyPopper } from "lucide-react";
import type { Hobby } from "@/lib/hobbies";

interface TutorialModalProps {
  hobby: Hobby | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (id: string) => void;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
}

export function TutorialModal({ hobby, isOpen, onClose, onComplete, onFavorite, isFavorite }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!hobby) return null;

  const progress = ((currentStep + 1) / hobby.steps.length) * 100;

  const handleNext = () => {
    if (currentStep < hobby.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      onComplete(hobby.id);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    setIsCompleted(false);
    onClose();
  };

  const colorMap: Record<string, string> = {
    "hobby-coral": "bg-hobby-coral/20",
    "hobby-blue": "bg-hobby-blue/20",
    "hobby-green": "bg-hobby-green/20",
    "hobby-yellow": "bg-hobby-yellow/20",
    "hobby-pink": "bg-hobby-pink/20",
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto" showCloseButton={false}>
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${colorMap[hobby.color]}`}>
                {hobby.emoji}
              </div>
              <div>
                <DialogTitle className="text-xl text-balance">{hobby.name}</DialogTitle>
                <DialogDescription className="sr-only">
                  Step-by-step tutorial for {hobby.name}. {hobby.duration} minutes, {hobby.difficulty} difficulty.
                </DialogDescription>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <Clock className="h-3 w-3" />
                    {hobby.duration} min
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFavorite(hobby.id)}
                className={isFavorite ? "text-hobby-coral" : "text-muted-foreground"}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {isCompleted ? (
          /* Completion screen */
          <div className="py-8 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-hobby-green/20 mb-4">
              <PartyPopper className="h-10 w-10 text-hobby-green" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Amazing work!</h3>
            <p className="text-muted-foreground mb-6">
              You completed {hobby.name}. Keep up the great momentum!
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={() => onFavorite(hobby.id)} className="gap-2">
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                {isFavorite ? "Favorited" : "Save to Favorites"}
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Materials section */}
            <div className="bg-muted/50 rounded-xl p-4 mb-4">
              <h4 className="font-semibold text-sm mb-2">Materials needed:</h4>
              <div className="flex flex-wrap gap-2">
                {hobby.materials.map((material, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {material}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{currentStep + 1} of {hobby.steps.length}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Current step */}
            <div className="bg-card border-2 border-primary/20 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {currentStep + 1}
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Current Step</span>
              </div>
              <p className="text-lg text-foreground">{hobby.steps[currentStep]}</p>
            </div>

            {/* Step indicators */}
            <div className="flex gap-1.5 justify-center mb-6">
              {hobby.steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentStep 
                      ? "w-6 bg-primary" 
                      : i < currentStep 
                        ? "w-2 bg-hobby-green" 
                        : "w-2 bg-muted"
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex-1"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button 
                onClick={handleNext}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {currentStep === hobby.steps.length - 1 ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Complete
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
