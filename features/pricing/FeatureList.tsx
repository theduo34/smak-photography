import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureListProps = {
  features: string[];
  className?: string;
};

export function FeatureList({ features, className }: FeatureListProps) {
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
          <Check className="mt-0.5 size-4 shrink-0 text-foreground" strokeWidth={1.5} />
          {feature}
        </li>
      ))}
    </ul>
  );
}
