import AdminTeamMemberCard from "./AdminTeamMemberCard";

function AdminTeamMemberList({
  members,
  isLoading,
  beginEdit,
  handleDelete,
  handleQuickOrderUpdate,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-slate-800">
        All Team Members
      </h2>

      {isLoading ? (
        <p className="text-slate-500">Loading team members...</p>
      ) : members.length === 0 ? (
        <p className="text-slate-500">No team members yet.</p>
      ) : (
        <ul className="space-y-3">
          {members.map((member) => (
            <AdminTeamMemberCard
              key={member.id}
              member={member}
              beginEdit={beginEdit}
              handleDelete={handleDelete}
              handleQuickOrderUpdate={handleQuickOrderUpdate}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminTeamMemberList;