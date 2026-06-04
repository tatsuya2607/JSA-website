import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const teamMembersCollection = collection(db, "teamMembers");

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeMemberPayload(payload) {
  return {
    name: payload.name?.trim() ?? "",
    role: payload.role?.trim() ?? "",
    message: payload.message?.trim() ?? "",
    imageUrl: payload.imageUrl?.trim() ?? "",
    order: toNumber(payload.order),
  };
}

export async function fetchMembers() {
  const membersQuery = query(teamMembersCollection, orderBy("order", "asc"), orderBy("createdAt", "asc"));
  const snapshot = await getDocs(membersQuery);

  return snapshot.docs.map((snapshotDoc) => ({
    id: snapshotDoc.id,
    ...snapshotDoc.data(),
    order: toNumber(snapshotDoc.data().order),
  }));
}

export async function addMember(payload) {
  const normalizedPayload = normalizeMemberPayload(payload);

  const snapshot = await addDoc(teamMembersCollection, {
    ...normalizedPayload,
    createdAt: serverTimestamp(),
  });

  return snapshot.id;
}

export async function updateMember(id, payload) {
  const normalizedPayload = normalizeMemberPayload(payload);

  await updateDoc(doc(db, "teamMembers", id), {
    ...normalizedPayload,
  });
}

export async function deleteMember(id) {
  await deleteDoc(doc(db, "teamMembers", id));
}
