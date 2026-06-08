import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-10 pb-16 sm:pb-24">
      <div className="section-shell flex flex-col gap-3 pt-32 pb-12">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-2/3 max-w-xl" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <div className="section-shell columns-1 gap-4 sm:columns-2 lg:columns-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="mb-4 w-full rounded-lg"
            style={{ height: 220 + (i % 3) * 60 }}
          />
        ))}
      </div>
    </div>
  );
}
