import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/features/pricing/PriceTag";
import { FeatureList } from "@/features/pricing/FeatureList";
import { categoryAccents } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Doc } from "@/convex/_generated/dataModel";

export type PackageCardData = Pick<
  Doc<"packages">,
  | "_id"
  | "name"
  | "category"
  | "price"
  | "currency"
  | "priceType"
  | "duration"
  | "description"
  | "features"
  | "popular"
>;

type PackageCardProps = {
  data: PackageCardData;
  onEnquire: (pkg: PackageCardData) => void;
};

export function PackageCard({ data, onEnquire }: PackageCardProps) {
  const accent = categoryAccents[data.category] ?? categoryAccents.Weddings;

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-colors",
        data.popular ? cn("border-2", accent.border) : cn("border-border", accent.hoverBorder)
      )}
    >
      <div className={cn("h-1.5 w-full", accent.bar)} aria-hidden />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-xs font-medium tracking-[0.15em] uppercase", accent.eyebrow)}>
            {data.category}
          </p>
          {data.popular && <Badge className="shrink-0">Popular</Badge>}
        </div>
        <h3 className="font-heading mt-1.5 text-xl font-semibold text-foreground">{data.name}</h3>

        <div className="mt-6">
          <PriceTag
            price={data.price}
            currency={data.currency}
            priceType={data.priceType}
            accentClassName={accent.eyebrow}
          />
          <p className="mt-1 text-xs text-muted-foreground">{data.duration}</p>
        </div>

        <div className="my-6 border-t border-border" />

        <p className="text-sm text-muted-foreground">{data.description}</p>
        <FeatureList features={data.features} className="mt-4" accentClassName={accent.eyebrow} />

        <div className="mt-auto pt-6">
          <Button
            className={cn(
              "h-auto w-full whitespace-normal py-2.5 text-center text-xs leading-snug font-semibold tracking-wide uppercase",
              accent.button
            )}
            onClick={() => onEnquire(data)}
          >
            Enquire about {data.name}
          </Button>
        </div>
      </div>
    </div>
  );
}
