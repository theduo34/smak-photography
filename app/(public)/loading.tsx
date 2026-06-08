import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col">
      <div className="relative flex min-h-[88vh] items-end overflow-hidden bg-muted">
        <div className="section-shell relative z-10 flex flex-col gap-6 pt-32 pb-16 sm:pb-24">
          <Skeleton className="h-12 w-full max-w-2xl" />
          <Skeleton className="h-6 w-full max-w-md" />
          <div className="flex gap-3">
            <Skeleton className="h-11 w-40 rounded-md" />
            <Skeleton className="h-11 w-44 rounded-md" />
          </div>
        </div>
      </div>

      <div className="section-shell section-padding flex flex-col gap-10">
        <Skeleton className="h-9 w-64" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-[4/5] w-full rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
