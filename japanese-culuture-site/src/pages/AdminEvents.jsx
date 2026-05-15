import { useCallback, useEffect, useState } from "react";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../api/events";
import { uploadImageFile } from "../api/uploads";
import {
  EVENT_CATEGORIES,
  EVENT_STATUSES,
} from "../constants/eventSchema";
import EventForm from "../components/admin/EventForm";
import EventListAdmin from "../components/admin/AdminEventList";
import Modal from "../components/ui/Modal";


const defaultFormData = {
  title: "",
  category: "",
  startAt: "",
  venueName: "",
  imageUrl: "",
  summary: "",
  status: "",
};

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingEventId, setEditingEventId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function loadEvents() {
    const data = await getEvents({ includeDrafts: true });
    setEvents(data);
  }

  const refreshData = useCallback(async () => {
    await loadEvents();
  }, []);

  useEffect(() => {
    async function loadData() {
      setErrorMessage("");

      try {
        await refreshData();
      } catch (error) {
        setErrorMessage(error.message || "Failed to load events.");
      }
    }

    loadData();
  }, [refreshData]);

  function resetForm() {
    setFormData(defaultFormData);
    setEditingEventId("");
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setErrorMessage("");

    try {
      const uploadedUrl = await uploadImageFile(file, "events");
      setFormData((prev) => ({ ...prev, imageUrl: uploadedUrl }));
    } catch (error) {
      setErrorMessage(error.message || "Failed to upload image.");
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  }

  async function handleDelete(eventId) {
    const shouldDelete = window.confirm("Are you sure to delete this event?");
    if (!shouldDelete) return;

    setErrorMessage("");
    setSuccessMessage("");

    try {
      await deleteEvent(eventId);
      if (editingEventId === eventId) {
        resetForm();
      }
      setSuccessMessage("Event deleted successfully!");
      await loadEvents();
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete event");
    }
  }

  function validateForm(formData) {
    const title = formData.title.trim();
    const venue = formData.venueName.trim();
    const summary = formData.summary.trim();

    if (title.length < 3) return "Title must be at least 3 characters";
    if (title.length > 50) return "Title must be under 50 characters";

    if (venue && venue.length < 2) return "Venue must be at least 2 characters";
    if (venue.length > 50) return "Venue must be under 50 characters";

    if (summary.length < 10) return "Summary must be at least 10 characters";
    if (summary.length > 200) return "Summary must be under 200 characters";

    return null;
  }

  function handleEdit(item) {
    setEditingEventId(item.id);
    setFormData({
      title: item.title ?? "",
      category: item.category ?? EVENT_CATEGORIES[0],
      startAt: item.startAt ?? "",
      venueName: item.venueName ?? "",
      imageUrl: item.imageUrl ?? "",
      summary: item.summary ?? "",
      status: item.status ?? EVENT_STATUSES[0],
    });

    setIsModalOpen(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const error = validateForm(formData);
    if (error) {
      setErrorMessage(error);
      setIsSaving(false);
      return;
    }

    try {
      if (editingEventId) {
        await updateEvent(editingEventId, formData);
        setSuccessMessage("Event updated successfully!");
      } else {
        await createEvent(formData);
        setSuccessMessage("Event created successfully!");
      }

      resetForm();
      setIsModalOpen(false);
      await loadEvents();

    } catch (error) {
      setErrorMessage(error.message || "Failed to save event");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Events Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Create, edit, and manage JSA events.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            + Create Event
          </button>
        </div>

        {/* Event List */}
        <EventListAdmin
          events={events}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EventForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleImageUpload={handleImageUpload}
          isSaving={isSaving}
          isUploadingImage={isUploadingImage}
          editingEventId={editingEventId}
          resetForm={() => {
            resetForm();
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

export default AdminEvents;
