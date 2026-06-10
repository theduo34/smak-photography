import Link from "next/link";
import { socialIcons, socialBrandColors } from "@/components/shared/SocialIcons";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  socials: Array<{ platform: string; url: string }>;
  className?: string;
};

export function SocialLinks({ socials, className }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {socials.map((social) => {
        const Icon = socialIcons[social.platform];
        return (
          <li key={social.platform}>
            <Link
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {Icon && <Icon className={cn("size-4", socialBrandColors[social.platform])} />}
              {social.platform}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
