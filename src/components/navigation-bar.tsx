"use client";

import Link from "next/link";
import HamburgerMenu from "@/components/hamburger-menu";
import { mainNav } from "@/data/navs";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export function NavigationBar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-4">
      <div className="container mx-auto px-2 flex h-14 items-center w-full justify-start space-x-6 md:space-x-8">
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-md text-blue-500">AEON</span>
          </Link>
        </div>

        {isDesktop ? (
          <>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {mainNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:block ml-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Input
                  name="search"
                  className="bg-gray-200"
                  placeholder="Search documentation"
                />
              </form>
            </div>
          </>
        ) : (
          <>
            <form
              className="flex items-center"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input className="border-none shadow-none" name="search" />
              <Button variant="ghost" size="icon" className="size-8">
                <SearchIcon />
              </Button>
            </form>
            <div className="md:hidden ml-auto">
              <HamburgerMenu items={mainNav} />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
