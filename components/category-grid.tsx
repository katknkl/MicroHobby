"use client";

import { Card } from "@/components/ui/card";
import { categories, getHobbiesByCategory } from "@/lib/hobbies";

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string | null;
}

export function CategoryGrid({ onSelectCategory, selectedCategory }: CategoryGridProps) {
  const colorMap: Record<string, string> = {
    "hobby-coral": "bg-hobby-coral/20 hover:bg-hobby-coral/30 border-hobby-coral/30",
    "hobby-blue": "bg-hobby-blue/20 hover:bg-hobby-blue/30 border-hobby-blue/30",
    "hobby-green": "bg-hobby-green/20 hover:bg-hobby-green/30 border-hobby-green/30",
    "hobby-yellow": "bg-hobby-yellow/20 hover:bg-hobby-yellow/30 border-hobby-yellow/30",
    "hobby-pink": "bg-hobby-pink/20 hover:bg-hobby-pink/30 border-hobby-pink/30",
  };

  const selectedColorMap: Record<string, string> = {
    "hobby-coral": "bg-hobby-coral/40 border-hobby-coral ring-2 ring-hobby-coral/50",
    "hobby-blue": "bg-hobby-blue/40 border-hobby-blue ring-2 ring-hobby-blue/50",
    "hobby-green": "bg-hobby-green/40 border-hobby-green ring-2 ring-hobby-green/50",
    "hobby-yellow": "bg-hobby-yellow/40 border-hobby-yellow ring-2 ring-hobby-yellow/50",
    "hobby-pink": "bg-hobby-pink/40 border-hobby-pink ring-2 ring-hobby-pink/50",
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
      {categories.map((category) => {
        const hobbyCount = getHobbiesByCategory(category.id).length;
        const isSelected = selectedCategory === category.id;
        
        return (
          <Card
            key={category.id}
            onClick={() => onSelectCategory(isSelected ? "" : category.id)}
            className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
              isSelected 
                ? selectedColorMap[category.color] 
                : colorMap[category.color]
            }`}
          >
            <div className="text-center">
              <span className="text-3xl block mb-2">{category.emoji}</span>
              <h3 className="font-semibold text-foreground text-sm">{category.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{hobbyCount} activities</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
