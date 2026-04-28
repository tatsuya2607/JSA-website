function AdminTeamMemberCard({
  member,
  beginEdit,
  handleDelete,
  handleQuickOrderUpdate,
}) {
  return (
    <li className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
      {member.imageUrl ? (
        <img
          src={member.imageUrl}
          alt={member.name}
          className="h-20 w-20 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-400">
          No image
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900">{member.name}</p>
        <p className="mt-1 text-sm text-slate-600">{member.role}</p>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {member.message}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Order
        </label>

        <input
          type="number"
          defaultValue={Number(member.order ?? 0)}
          onBlur={(event) =>
            handleQuickOrderUpdate(member, event.target.value)
          }
          className="w-20 rounded-md border border-slate-300 px-2 py-1 text-sm"
        />

        <button
          type="button"
          onClick={() => beginEdit(member)}
          className="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-amber-600"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => handleDelete(member.id)}
          className="rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default AdminTeamMemberCard;