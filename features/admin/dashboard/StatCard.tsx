import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatTone = "primary" | "phone" | "whatsapp" | "neutral";

const toneClasses: Record<StatTone, string> = {
  primary: "bg-primary/10 text-primary",
  phone: "bg-phone/10 text-phone",
  whatsapp: "bg-whatsapp/10 text-whatsapp",
  neutral: "bg-muted text-foreground",
};

type StatCardProps = {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: StatTone;
  hint?: string;
};

export function StatCard({ label, value, icon: Icon, tone = "neutral", hint }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase lg:text-sm">
            {label}
          </span>
          <p className="text-3xl font-semibold text-foreground lg:text-4xl">{value}</p>
          {hint && <p className="text-xs text-muted-foreground lg:text-sm">{hint}</p>}
        </div>
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full lg:size-12",
            toneClasses[tone]
          )}
        >
          <Icon className="size-5 lg:size-6" strokeWidth={1.75} />
        </div>
      </CardContent>
    </Card>
  );
}
