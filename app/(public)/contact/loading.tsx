import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="section-shell section-padding flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Skeleton className="h-96 w-full rounded-lg" />
        <div className="flex flex-col gap-6">
          <Skeleton className="aspect-[4/3] w-full rounded-lg sm:aspect-video" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
