// src/pages/AdminPage.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Navigate } from "react-router-dom";

export default function Admin() {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    if (user === undefined) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/admin-login" />;
    }

    return <div>Admin Dashboard</div>;
}