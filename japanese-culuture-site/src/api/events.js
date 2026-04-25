import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { normalizeEventPayload } from "../constants/eventSchema";

function byStartAtAscending(a, b) {
  return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
}

export async function getEvents({ includeDrafts = false } = {}) {
  const snapshot = await getDocs(collection(db, "events"));

  const events = snapshot.docs.map((snapshotDoc) => ({
    id: snapshotDoc.id,
    ...snapshotDoc.data(),
  }));

  return events
    .filter((event) => includeDrafts || event.status === "published")
    .sort(byStartAtAscending);
}

export async function getEventById(id) {
  const snapshot = await getDoc(doc(db, "events", id));
  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function createEvent(payload) {
  const normalizedPayload = normalizeEventPayload(payload);

  const snapshot = await addDoc(collection(db, "events"), {
    ...normalizedPayload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return snapshot.id;
}
