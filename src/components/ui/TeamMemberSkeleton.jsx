function TeamMemberSkeleton() {
  return (
    <div
      className="w-full max-w-xs animate-pulse rounded-xl bg-white p-6 text-center shadow-md"
      aria-hidden="true"
    >
      <div className="mx-auto h-24 w-24 rounded-full bg-slate-200" />
      <div className="mx-auto mt-4 h-5 w-32 rounded bg-slate-200" />
      <div className="mx-auto mt-2 h-4 w-20 rounded bg-slate-200" />
      <div className="mx-auto mt-3 h-3 w-full rounded bg-slate-200" />
      <div className="mx-auto mt-2 h-3 w-5/6 rounded bg-slate-200" />
    </div>
  );
}

export default TeamMemberSkeleton;
