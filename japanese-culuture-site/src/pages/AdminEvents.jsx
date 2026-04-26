import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const defaultFormData = {
  primaryText: "",
  secondaryText: "",
};

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState("");
  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingKey, setDeletingKey] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchEvents() {
    const snapshot = await getDocs(collection(db, "events"));
    const eventItems = snapshot.docs.map((snapshotDoc) => ({
      id: snapshotDoc.id,
      ...snapshotDoc.data(),
    }));

    setEvents(eventItems);
  }

  async function fetchTeams() {
    const snapshot = await getDocs(collection(db, "teams"));
    const teamItems = snapshot.docs.map((snapshotDoc) => ({
      id: snapshotDoc.id,
      ...snapshotDoc.data(),
    }));

    setTeams(teamItems);
  }

  async function refreshData() {
    await Promise.all([fetchEvents(), fetchTeams()]);
  }

  function resetForm() {
    setEditingItem(null);
    setEditingType("");
    setFormData(defaultFormData);
  }

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        await refreshData();
      } catch (error) {
        setErrorMessage(error.message || "Failed to load events and teams.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  function handleEdit(item, type) {
    setSuccessMessage("");
    setErrorMessage("");
    setEditingItem(item.id);
    setEditingType(type);
    setFormData({
      primaryText: type === "event" ? item.title || "" : item.name || "",
      secondaryText: type === "event" ? item.summary || "" : item.description || "",
    });
  }

  async function handleUpdate(event) {
    event.preventDefault();

    if (!editingItem || !editingType) {
      return;
    }

    if (!formData.primaryText.trim() || !formData.secondaryText.trim()) {
      setErrorMessage("Both fields are required.");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const collectionName = editingType === "event" ? "events" : "teams";

    try {
      await updateDoc(doc(db, collectionName, editingItem), {
        ...(editingType === "event"
          ? {
              title: formData.primaryText.trim(),
              summary: formData.secondaryText.trim(),
            }
          : {
              name: formData.primaryText.trim(),
              description: formData.secondaryText.trim(),
            }),
        updatedAt: new Date(),
      });

      await refreshData();
      resetForm();
      setSuccessMessage(`${editingType === "event" ? "Event" : "Team"} updated successfully.`);
    } catch (error) {
      setErrorMessage(error.message || "Failed to update item.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id, type) {
    const shouldDelete = window.confirm(`Are you sure you want to delete this ${type}?`);

    if (!shouldDelete) {
      return;
    }

    const collectionName = type === "event" ? "events" : "teams";
    const operationKey = `${type}-${id}`;

    setDeletingKey(operationKey);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await deleteDoc(doc(db, collectionName, id));
      await refreshData();

      if (editingItem === id && editingType === type) {
        resetForm();
      }

      setSuccessMessage(`${type === "event" ? "Event" : "Team"} deleted successfully.`);
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete item.");
    } finally {
      setDeletingKey("");
    }
  }

  const isEditing = Boolean(editingItem);
  const primaryLabel = editingType === "event" ? "Title" : "Name";
  const secondaryLabel = editingType === "event" ? "Summary" : "Description";

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-6 py-14">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Admin: Events & Teams</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage both events and teams from a single page.
        </p>
      </header>

      {errorMessage ? (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{errorMessage}</p>
      ) : null}

      {successMessage ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</p>
      ) : null}

      {isEditing ? (
        <form
          onSubmit={handleUpdate}
          className="space-y-4 rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Edit {editingType === "event" ? "Event" : "Team"}
              </h2>
              <p className="text-sm text-slate-500">Use this shared form to update the selected item.</p>
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">{primaryLabel}</span>
            <input
              required
              value={formData.primaryText}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  primaryText: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">{secondaryLabel}</span>
            <textarea
              required
              value={formData.secondaryText}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  secondaryText: event.target.value,
                }))
              }
              className="h-28 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </form>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-800">Events</h2>
          {isLoading ? <p className="text-sm text-slate-500">Loading events...</p> : null}
          {!isLoading && events.length === 0 ? <p className="text-sm text-slate-500">No events found.</p> : null}
          <ul className="space-y-3">
            {events.map((event) => {
              const operationKey = `event-${event.id}`;
              const isDeleting = deletingKey === operationKey;

              return (
                <li key={event.id} className="rounded-lg border border-slate-100 p-4">
                  <p className="font-semibold text-slate-800">{event.title || "Untitled event"}</p>
                  <p className="mt-1 text-sm text-slate-600">{event.summary || "No summary"}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(event, "event")}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(event.id, "event")}
                      disabled={isDeleting}
                      className="rounded-lg border border-rose-300 px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-800">Teams</h2>
          {isLoading ? <p className="text-sm text-slate-500">Loading teams...</p> : null}
          {!isLoading && teams.length === 0 ? <p className="text-sm text-slate-500">No teams found.</p> : null}
          <ul className="space-y-3">
            {teams.map((team) => {
              const operationKey = `team-${team.id}`;
              const isDeleting = deletingKey === operationKey;

              return (
                <li key={team.id} className="rounded-lg border border-slate-100 p-4">
                  <p className="font-semibold text-slate-800">{team.name || "Unnamed team"}</p>
                  <p className="mt-1 text-sm text-slate-600">{team.description || "No description"}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(team, "team")}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(team.id, "team")}
                      disabled={isDeleting}
                      className="rounded-lg border border-rose-300 px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default AdminEvents;
