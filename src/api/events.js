import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { restGetCollection, restGetDocument } from "../firebase/firestoreRest";
import { normalizeEventPayload } from "../constants/eventSchema";

function byStartAtAscending(a, b) {
  const ta = new Date(a.startAt).getTime();
  const tb = new Date(b.startAt).getTime();
  if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
  if (Number.isNaN(ta)) return 1;
  if (Number.isNaN(tb)) return -1;
  return ta - tb;
}

export async function getEvents({ includeDrafts = false } = {}) {
  const events = await restGetCollection("events");

  return events
    .filter((event) => includeDrafts || event.status === "published")
    .sort(byStartAtAscending);
}

export async function getEventById(id) {
  return restGetDocument("events", id);
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

export async function updateEvent(id, payload) {
  const normalizedPayload = normalizeEventPayload(payload);

  await updateDoc(doc(db, "events", id), {
    ...normalizedPayload,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteEvent(id) {
  await deleteDoc(doc(db, "events", id));
}
