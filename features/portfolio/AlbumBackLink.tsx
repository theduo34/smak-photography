"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function AlbumBackLink() {
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const referrer = document.referrer && new URL(document.referrer);
    if (referrer && referrer.origin === window.location.origin) {
      event.preventDefault();
      router.back();
    }
  }

  return (
    <Link
      href="/portfolio"
      onClick={handleClick}
      className="group inline-flex items-center gap-1.5 rounded-md border border-background/10 bg-foreground/10 py-2 pr-4 pl-2.5 text-sm font-medium text-background backdrop-blur-sm transition-colors hover:bg-foreground/30"
    >
      <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
      Back
    </Link>
  );
}
