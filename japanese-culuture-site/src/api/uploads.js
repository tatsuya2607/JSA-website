import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";

function sanitizeFileName(fileName) {
  return fileName.replace(/\s+/g, "-").replace(/[^\w.-]/g, "").toLowerCase();
}

export async function uploadImageFile(file, folder = "uploads") {
  if (!file) {
    throw new Error("No file selected");
  }

  const timestamp = Date.now();
  const normalizedName = sanitizeFileName(file.name || "image");
  const storageRef = ref(storage, `${folder}/${timestamp}-${normalizedName}`);

  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
