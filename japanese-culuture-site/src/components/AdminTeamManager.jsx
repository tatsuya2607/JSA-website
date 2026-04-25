import { useEffect, useMemo, useState } from "react";
import {
  addMember,
  deleteMember,
  fetchMembers,
  updateMember,
} from "../api/teamMembers";

const initialFormData = {
  name: "",
  role: "",
  message: "",
  imageUrl: "",
  order: 0,
};

function AdminTeamManager() {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  async function loadMembers() {
    const data = await fetchMembers();
    setMembers(data);
  }

  useEffect(() => {
    let isMounted = true;

    fetchMembers().then((data) => {
      if (isMounted) {
        setMembers(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  function resetForm() {
    setFormData(initialFormData);
    setEditingId("");
  }

  function beginEdit(member) {
    setEditingId(member.id);
    setFormData({
      name: member.name ?? "",
      role: member.role ?? "",
      message: member.message ?? "",
      imageUrl: member.imageUrl ?? "",
      order: Number(member.order ?? 0),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);

    if (isEditing) {
      await updateMember(editingId, formData);
    } else {
      await addMember(formData);
    }

    await loadMembers();
    resetForm();
    setIsSaving(false);
  }

  async function handleDelete(memberId) {
    const shouldDelete = window.confirm("Delete this team member?");
    if (!shouldDelete) return;

    await deleteMember(memberId);
    await loadMembers();

    if (editingId === memberId) {
      resetForm();
    }
  }

  async function handleQuickOrderUpdate(member, nextOrder) {
    await updateMember(member.id, { ...member, order: Number(nextOrder) });
    await loadMembers();
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-slate-800">Manage Members</h2>

        <input
          required
          value={formData.name}
          onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
          placeholder="Name"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />

        <input
          required
          value={formData.role}
          onChange={(event) => setFormData((prev) => ({ ...prev, role: event.target.value }))}
          placeholder="Role"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />

        <input
          required
          value={formData.message}
          onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
          placeholder="Message (1 line)"
          maxLength={120}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />

        <input
          required
          value={formData.imageUrl}
          onChange={(event) => setFormData((prev) => ({ ...prev, imageUrl: event.target.value }))}
          placeholder="Image URL"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />

        <input
          required
          type="number"
          value={formData.order}
          onChange={(event) => setFormData((prev) => ({ ...prev, order: Number(event.target.value) }))}
          placeholder="Order"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : isEditing ? "Update Member" : "Add Member"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">All Team Members</h2>

        {isLoading ? (
          <p className="text-slate-500">Loading team members...</p>
        ) : members.length === 0 ? (
          <p className="text-slate-500">No team members yet.</p>
        ) : (
          <ul className="space-y-3">
            {members.map((member) => (
              <li
                key={member.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">{member.name}</p>
                    <p className="text-sm text-slate-600">{member.role}</p>
                    <p className="text-sm text-slate-500">{member.message}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Order</label>
                    <input
                      type="number"
                      defaultValue={Number(member.order ?? 0)}
                      onBlur={(event) => handleQuickOrderUpdate(member, event.target.value)}
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
                      Delete Member
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default AdminTeamManager;
