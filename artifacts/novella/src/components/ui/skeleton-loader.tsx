import { cn } from "@/lib/utils";

export function SkeletonLoader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export function BookCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <SkeletonLoader className="h-[350px] w-full rounded-lg" />
      <div className="space-y-2">
        <SkeletonLoader className="h-4 w-3/4" />
        <SkeletonLoader className="h-3 w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <SkeletonLoader className="h-5 w-1/4" />
          <SkeletonLoader className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="space-y-12 pb-12">
      <SkeletonLoader className="h-[60vh] w-full rounded-none" />
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center space-y-4">
          <SkeletonLoader className="h-8 w-64 mx-auto" />
          <SkeletonLoader className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ShopSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <SkeletonLoader className="h-10 w-48 mb-8" />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 space-y-6">
          <SkeletonLoader className="h-8 w-full" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonLoader key={i} className="h-4 w-3/4" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
