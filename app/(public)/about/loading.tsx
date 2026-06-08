import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="section-shell section-padding flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <Skeleton className="aspect-[4/5] w-full rounded-lg lg:order-last" />
        <div className="mx-auto flex w-full max-w-md flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
