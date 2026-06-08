import { Badge } from "@/components/ui/badge";
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
        "flex flex-col gap-4 rounded-lg border border-border p-6",
        data.popular && "border-foreground"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-medium text-foreground">{data.name}</h3>
          <p className="text-sm text-muted-foreground">{data.duration}</p>
        </div>
        {data.popular && <Badge variant="secondary">Popular</Badge>}
      </div>
      <PriceTag price={data.price} currency={data.currency} priceType={data.priceType} />
      <p className="text-sm text-muted-foreground">{data.description}</p>
      <FeatureList features={data.features} className="mt-1" />
      <Button className="mt-2" onClick={() => onEnquire(data)}>
        Enquire about this package
      </Button>
    </div>
  );
}
