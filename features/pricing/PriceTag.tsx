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
      <span className={cn("text-2xl font-semibold text-foreground", className)}>
        Custom quote
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      {priceType === "from" && (
        <span className="text-sm text-muted-foreground">from</span>
      )}
      <span className="text-2xl font-semibold text-foreground">
        {currency} {price.toLocaleString("en-US")}
      </span>
    </span>
  );
}
