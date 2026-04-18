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
    href: "/explore?category=crafts&scroll=origami-crane",
    hobbies: [
      { label: "Origami", href: "/explore?category=crafts&scroll=origami-crane" },
      { label: "Friendship Bracelet", href: "/explore?category=crafts&scroll=friendship-bracelet" },
      { label: "Pressed Flowers", href: "/explore?category=outdoor&scroll=press-flowers" },
    ],
  },
  {
    icon: Users,
    title: "Girls Night Ideas",
    description: "Fun activities to do with friends",
    color: "bg-hobby-pink/20 text-hobby-pink",
    href: "/explore?category=art&scroll=watercolor-sunset",
    hobbies: [
      { label: "Paint a Sunset", href: "/explore?category=art&scroll=watercolor-sunset" },
      { label: "Mug Cake", href: "/explore?category=cooking&scroll=mug-cake" },
      { label: "Zentangle", href: "/explore?category=art&scroll=mindful-sketch" },
    ],
  },
  {
    icon: Leaf,
    title: "Touch Some Grass",
    description: "Get off TikTok and into nature",
    color: "bg-hobby-green/20 text-hobby-green",
    href: "/explore?category=outdoor&scroll=herb-windowsill",
    hobbies: [
      { label: "Herb Garden", href: "/explore?category=outdoor&scroll=herb-windowsill" },
      { label: "Nature Walk Bingo", href: "/explore?category=outdoor&scroll=nature-walk-bingo" },
      { label: "Press Flowers", href: "/explore?category=outdoor&scroll=press-flowers" },
    ],
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
              <Link
                key={hobby.label}
                href={hobby.href}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                {hobby.label}
              </Link>
            ))}
          </div>
          <Link href={idea.href} className="w-full">
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
