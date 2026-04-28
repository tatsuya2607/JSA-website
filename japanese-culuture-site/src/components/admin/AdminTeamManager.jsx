import { useEffect, useState } from "react";
import {
  addMember,
  deleteMember,
  fetchMembers,
  updateMember,
} from "../../api/teamMembers";
import { uploadImageFile } from "../../api/uploads";
import TeamMemberForm from "./TeamMemberForm";
import AdminTeamMemberList from "./AdminTeamMemberList";

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
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadError, setUploadError] = useState("");

  const isEditing = Boolean(editingId);

  async function loadMembers() {
    const data = await fetchMembers();
    setMembers(data);
  }

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      try {
        await loadMembers();
      } catch (error) {
        setUploadError(error.message || "Failed to load team members.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
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
    setUploadError("");

    try {
      if (isEditing) {
        await updateMember(editingId, formData);
      } else {
        await addMember(formData);
      }

      await loadMembers();
      resetForm();
    } catch (error) {
      setUploadError(error.message || "Failed to save team member.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setUploadError("");

    try {
      const uploadedUrl = await uploadImageFile(file, "teamMembers");
      setFormData((prev) => ({ ...prev, imageUrl: uploadedUrl }));
    } catch (error) {
      setUploadError(error.message || "Failed to upload image.");
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  }

  async function handleDelete(memberId) {
    const shouldDelete = window.confirm("Delete this team member?");
    if (!shouldDelete) return;

    try {
      await deleteMember(memberId);
      await loadMembers();

      if (editingId === memberId) {
        resetForm();
      }
    } catch (error) {
      setUploadError(error.message || "Failed to delete team member.");
    }
  }

  async function handleQuickOrderUpdate(member, nextOrder) {
    try {
      await updateMember(member.id, {
        ...member,
        order: Number(nextOrder),
      });

      await loadMembers();
    } catch (error) {
      setUploadError(error.message || "Failed to update order.");
    }
  }

  return (
    <section className="mx-auto items-start grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1fr_1.4fr]">
      <TeamMemberForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload}
        isSaving={isSaving}
        isEditing={isEditing}
        isUploadingImage={isUploadingImage}
        uploadError={uploadError}
        resetForm={resetForm}
      />

      <AdminTeamMemberList
        members={members}
        isLoading={isLoading}
        beginEdit={beginEdit}
        handleDelete={handleDelete}
        handleQuickOrderUpdate={handleQuickOrderUpdate}
      />
    </section>
  );
}

export default AdminTeamManager;