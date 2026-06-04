function EventCardSkeleton() {
  return (
    <div className="w-80 animate-pulse" aria-hidden="true">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white">
        <div className="aspect-[4/3] bg-slate-200" />

        <div className="flex flex-col gap-3 p-4 md:p-5">
          <div className="flex items-center gap-2">
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="h-4 w-16 rounded-full bg-slate-200" />
          </div>

          <div className="h-5 w-3/4 rounded bg-slate-200" />

          <div className="h-3 w-full rounded bg-slate-200" />
          <div className="h-3 w-5/6 rounded bg-slate-200" />

          <div className="mt-3 h-3 w-1/2 rounded bg-slate-200" />
          <div className="mt-3 h-3 w-24 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export default EventCardSkeleton;
