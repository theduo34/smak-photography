import { cn } from "@/lib/utils";
import type { Doc } from "@/convex/_generated/dataModel";

type PriceTagProps = {
  price: number;
  currency: string;
  priceType: Doc<"packages">["priceType"];
  className?: string;
  accentClassName?: string;
};

export function PriceTag({
  price,
  currency,
  priceType,
  className,
  accentClassName = "text-primary",
}: PriceTagProps) {
  if (priceType === "custom") {
    return (
      <span className={cn("text-3xl font-bold tracking-tight", accentClassName, className)}>
        Custom
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-baseline gap-1", className)}>
      {priceType === "from" && (
        <span className="text-sm text-muted-foreground">from</span>
      )}
      <span className="text-xs font-medium text-muted-foreground">{currency}</span>
      <span className={cn("text-3xl font-bold tracking-tight", accentClassName)}>
        {price.toLocaleString("en-US")}
      </span>
    </span>
  );
}
