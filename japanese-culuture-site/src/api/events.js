import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getEvents() {
  const snapshot = await getDocs(collection(db, "events"));

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}