import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Some env sources (e.g. values imported with a UTF-8 BOM) prepend a BOM
// (U+FEFF) to the value, which makes the project id / API key invalid and
// causes Firestore to fail with PERMISSION_DENIED. Strip it defensively.
const clean = (value) => (value ?? "").replace(/^\uFEFF/, "").trim();

export const firebaseProjectId = clean(import.meta.env.VITE_FIREBASE_PROJECT_ID);
export const firebaseApiKey = clean(import.meta.env.VITE_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: clean(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: firebaseProjectId,
  storageBucket: clean(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: clean(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: clean(import.meta.env.VITE_FIREBASE_APP_ID),
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
