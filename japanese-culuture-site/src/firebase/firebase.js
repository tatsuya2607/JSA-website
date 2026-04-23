// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "japanese-culture-96191.firebaseapp.com",
  projectId: "japanese-culture-96191",
  storageBucket: "japanese-culture-96191.firebasestorage.app",
  messagingSenderId: "919380102898",
  appId: "1:919380102898:web:55bf3c31e5585da91dca6b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);