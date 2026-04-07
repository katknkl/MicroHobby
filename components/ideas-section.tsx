"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Users, Leaf, ArrowRight } from "lucide-react";

const ideas = [
  {
    icon: Gift,
    title: "Thoughtful Gifts",
    description: "Make handmade presents for loved ones",
    color: "bg-hobby-coral/20 text-hobby-coral",
    hobbies: ["Origami", "Friendship Bracelet", "Pressed Flowers"],
  },
  {
    icon: Users,
    title: "Girls Night Ideas",
    description: "Fun activities to do with friends",
    color: "bg-hobby-pink/20 text-hobby-pink",
    hobbies: ["Paint a Sunset", "Mug Cake", "Zentangle"],
  },
  {
    icon: Leaf,
    title: "Touch Some Grass",
    description: "Get off TikTok and into nature",
    color: "bg-hobby-green/20 text-hobby-green",
    hobbies: ["Herb Garden", "Nature Walk Bingo", "Press Flowers"],
  },
];

export function IdeasSection() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {ideas.map((idea) => (
        <Card key={idea.title} className="p-5 hover:shadow-md transition-shadow">
          <div className={`inline-flex p-3 rounded-xl ${idea.color} mb-4`}>
            <idea.icon className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg text-foreground mb-1">{idea.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{idea.description}</p>
          <div className="space-y-2">
            {idea.hobbies.map((hobby) => (
              <div key={hobby} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {hobby}
              </div>
            ))}
          </div>
          <Link href="/explore" className="w-full">
            <Button variant="ghost" className="w-full mt-4 justify-between text-primary">
              Explore
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  );
}
