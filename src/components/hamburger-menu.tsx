// components/hamburger-menu.tsx
"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { MenuItem } from "@/types/global";

export default function HamburgerMenu({
  items,
}: Readonly<{ items: MenuItem[] }>) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full">
        <SheetHeader className="sr-only">
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          <SheetDescription className="sr-only"></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-6 mt-10">
          <nav className="flex flex-col space-y-4 px-2">
            {items.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
