/* Global loading skeleton — shown while route segments stream */
export default function Loading() {
  return (
    <>
      {/* Header skeleton — matches PageHeader navy block */}
      <section className="relative bg-navy text-paper overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/70 to-navy" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-20">
          <div className="h-3 w-48 bg-paper/15 rounded animate-pulse" />
          <div className="mt-10 h-4 w-40 bg-amber/40 rounded animate-pulse" />
          <div className="mt-5 space-y-3">
            <div className="h-12 w-3/4 bg-paper/15 rounded animate-pulse" />
            <div className="h-12 w-2/3 bg-paper/15 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Body skeleton */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 space-y-6">
          <div className="h-3 w-24 bg-mist rounded animate-pulse" />
          <div className="h-10 w-2/3 max-w-xl bg-mist/70 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl bg-white border border-black/5 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
