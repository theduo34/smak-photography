import { Clock } from "lucide-react";

type BusinessHoursProps = {
  hours: string;
};

export function BusinessHours({ hours }: BusinessHoursProps) {
  const lines = hours.split("\n").filter(Boolean);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-6">
      <div className="flex items-center gap-2 text-base font-medium text-foreground">
        <Clock className="size-4" strokeWidth={1.5} />
        Studio hours
      </div>
      <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
