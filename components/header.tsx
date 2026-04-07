"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, Flame, Search, Leaf, User, Calendar } from "lucide-react";

interface HeaderProps {
  currentStreak: number;
}

export function Header({ currentStreak }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/calendar", label: "Calendar" },
    { href: "/explore", label: "Explore" },
    { href: "/tutorials", label: "Tutorials" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto flex h-16 items-center px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-hobby-yellow">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">MicroHobby</span>
        </Link>

        {/* Desktop Nav - Centered */}
        <nav className="hidden md:flex items-center justify-center gap-6 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side - Streak & Actions */}
        <div className="flex items-center gap-3">
          {/* Streak Badge */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-hobby-yellow/20 px-3 py-1.5">
            <Flame className="h-4 w-4 text-hobby-coral" />
            <span className="text-sm font-bold text-foreground">{currentStreak}</span>
            <span className="text-xs text-muted-foreground">day streak</span>
          </div>

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search hobbies</span>
          </Button>

          <Link href="/calendar" className="hidden md:flex">
            <Button variant="ghost" size="icon">
              <Calendar className="h-5 w-5" />
              <span className="sr-only">View calendar</span>
            </Button>
          </Link>

          <Link href="/account" className="hidden md:flex">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate through MicroHobby sections and view your streak progress.
              </SheetDescription>
              <div className="flex flex-col gap-6 pt-6">
                {/* Mobile Streak */}
                <div className="flex items-center gap-2 rounded-xl bg-hobby-yellow/20 p-3">
                  <Flame className="h-5 w-5 text-hobby-coral" />
                  <div>
                    <span className="text-lg font-bold">{currentStreak}</span>
                    <span className="text-sm text-muted-foreground ml-1">day streak</span>
                  </div>
                </div>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/account"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    Account
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Sign Up
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
