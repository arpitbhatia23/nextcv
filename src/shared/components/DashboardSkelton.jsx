export function DashboardSkeleton() {
  return (
    <div className="min-h-screen p-6 md:p-10" style={{ backgroundColor: "#F8F7F3" }}>
      {/* Header skeleton */}
      <div className="mb-10 pb-6 border-b" style={{ borderColor: "#E3E2DC" }}>
        <div
          className="h-3 w-24 rounded-full mb-3 animate-pulse"
          style={{ backgroundColor: "#E3E2DC" }}
        />
        <div
          className="h-7 w-64 rounded-xl mb-2 animate-pulse"
          style={{ backgroundColor: "#E3E2DC" }}
        />
        <div
          className="h-4 w-96 max-w-full rounded-xl animate-pulse"
          style={{ backgroundColor: "#E3E2DC" }}
        />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Primary CTA skeleton */}
          <div
            className="rounded-2xl border overflow-hidden animate-pulse"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E3E2DC" }}
          >
            <div className="p-8 flex flex-col gap-4">
              <div className="h-10 w-10 rounded-xl" style={{ backgroundColor: "#E3E2DC" }} />
              <div className="h-3 w-20 rounded-full" style={{ backgroundColor: "#E3E2DC" }} />
              <div className="h-6 w-56 rounded-xl" style={{ backgroundColor: "#E3E2DC" }} />
              <div className="h-4 w-full rounded-xl" style={{ backgroundColor: "#E3E2DC" }} />
              <div className="h-4 w-3/4 rounded-xl" style={{ backgroundColor: "#E3E2DC" }} />
              <div className="h-10 w-40 rounded-xl mt-2" style={{ backgroundColor: "#E3E2DC" }} />
            </div>
          </div>

          {/* Steps skeleton */}
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border p-6 animate-pulse"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E3E2DC" }}
              >
                <div className="h-10 w-10 rounded-xl mb-4" style={{ backgroundColor: "#E3E2DC" }} />
                <div className="h-4 w-24 rounded-xl mb-2" style={{ backgroundColor: "#E3E2DC" }} />
                <div className="h-3 w-full rounded-xl" style={{ backgroundColor: "#E3E2DC" }} />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border p-6 animate-pulse"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E3E2DC",
                minHeight: i === 0 ? "180px" : "120px",
              }}
            >
              <div className="h-4 w-3/4 rounded-xl mb-3" style={{ backgroundColor: "#E3E2DC" }} />
              <div className="h-3 w-full rounded-xl mb-2" style={{ backgroundColor: "#E3E2DC" }} />
              <div className="h-3 w-2/3 rounded-xl" style={{ backgroundColor: "#E3E2DC" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
