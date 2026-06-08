import { Button } from "@/components/ui/button";
import { PriceTag } from "@/features/pricing/PriceTag";
import { FeatureList } from "@/features/pricing/FeatureList";
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
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border bg-card",
        data.popular ? "border-primary" : "border-border"
      )}
    >
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
            {data.category}
          </p>
          {data.popular && (
            <span className="shrink-0 rounded-full border border-primary px-2.5 py-0.5 text-xs font-medium text-primary">
              Popular
            </span>
          )}
        </div>
        <h3 className="mt-1.5 text-xl font-semibold text-foreground">{data.name}</h3>

        <div className="mt-6">
          <PriceTag price={data.price} currency={data.currency} priceType={data.priceType} />
          <p className="mt-1 text-xs text-muted-foreground">{data.duration}</p>
        </div>

        <div className="my-6 border-t border-border" />

        <p className="text-sm text-muted-foreground">{data.description}</p>
        <FeatureList features={data.features} className="mt-4" />

        <div className="mt-auto pt-6">
          <Button
            className="w-full"
            variant={data.popular ? "default" : "outline"}
            onClick={() => onEnquire(data)}
          >
            Enquire
          </Button>
        </div>
      </div>
    </div>
  );
}
