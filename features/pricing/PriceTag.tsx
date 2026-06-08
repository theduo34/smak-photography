import { cn } from "@/lib/utils";
import type { Doc } from "@/convex/_generated/dataModel";

type PriceTagProps = {
  price: number;
  currency: string;
  priceType: Doc<"packages">["priceType"];
  className?: string;
};

export function PriceTag({ price, currency, priceType, className }: PriceTagProps) {
  if (priceType === "custom") {
    return (
      <span className={cn("text-3xl font-bold tracking-tight text-foreground", className)}>
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
      <span className="text-3xl font-bold tracking-tight text-foreground">
        {price.toLocaleString("en-US")}
      </span>
    </span>
  );
}
