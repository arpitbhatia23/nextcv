export function DashboardSkeleton() {
  return (
    <div className="min-h-screen p-6">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
      </div>
    </div>
  );
}
