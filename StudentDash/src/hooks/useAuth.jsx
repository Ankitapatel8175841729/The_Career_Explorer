import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => onAuthStateChanged(auth, setUser), []);

    return user;
}