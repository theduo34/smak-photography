import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="section-shell section-padding flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>
      <div className="flex flex-col gap-16">
        {Array.from({ length: 2 }).map((_, g) => (
          <div key={g} className="flex flex-col gap-6">
            <Skeleton className="h-7 w-40" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
