import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  socials: Array<{ platform: string; url: string }>;
  className?: string;
};

export function SocialLinks({ socials, className }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {socials.map((social) => (
        <li key={social.platform}>
          <Link
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {social.platform}
            <ArrowUpRight className="size-3.5" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
