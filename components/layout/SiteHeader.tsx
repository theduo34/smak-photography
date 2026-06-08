"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const HERO_ROUTES = [/^\/$/, /^\/portfolio\/[^/]+\/?$/];
const SCROLL_THRESHOLD = 80;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const transparent = HERO_ROUTES.some((pattern) => pattern.test(pathname)) && !scrolled;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trigger = transparent
    ? "text-background hover:bg-background/10 hover:text-background"
    : undefined;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        transparent
          ? "bg-transparent"
          : "border-b border-border bg-background/85 backdrop-blur-sm"
      )}
    >
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo/logo-1-removebg-preview.png"
            alt={siteConfig.name}
            width={36}
            height={36}
            priority
            className={cn(
              "size-9 object-contain transition-[filter] duration-300",
              transparent ? "invert dark:invert-0" : "dark:invert"
            )}
          />
          <span
            className={cn(
              "font-heading text-base font-semibold tracking-tight transition-colors duration-300",
              transparent ? "text-background" : "text-foreground"
            )}
          >
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <ThemeToggle className={trigger} />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" className={trigger}>
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {siteConfig.navItems.map((item) => {
                  const active =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <SheetClose
                      key={item.href}
                      nativeButton={false}
                      render={
                        <Link
                          href={item.href}
                          className={cn(
                            "rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent hover:text-foreground",
                            active ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {item.label}
                        </Link>
                      }
                    />
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
