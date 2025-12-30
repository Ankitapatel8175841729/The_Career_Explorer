import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function AdminApp() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, setUser);
    }, []);

    return user ? <Dashboard /> : <Login />;
}