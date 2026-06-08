import Link from "next/link";
import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  categories: string[];
  active?: string;
};

const pill =
  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors";
const pillActive = "border-foreground bg-foreground text-background";
const pillInactive =
  "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground";

export function CategoryFilter({ categories, active }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/portfolio"
        className={cn(pill, !active ? pillActive : pillInactive)}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/portfolio?category=${encodeURIComponent(category)}`}
          className={cn(pill, active === category ? pillActive : pillInactive)}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
