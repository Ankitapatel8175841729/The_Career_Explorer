import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function SavedCareers({ uid }) {
    const [careers, setCareers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const snap = await getDocs(collection(db, "users", uid, "savedCareers"));
            setCareers(snap.docs.map(d => d.data()));
        }
        fetchData();
    }, [uid]);

    return (
        <>
            <h2>Saved Careers</h2>
            <ul>{careers.map((c, i) => <li key={i}>{c.name}</li>)}</ul>
        </>
    );
}