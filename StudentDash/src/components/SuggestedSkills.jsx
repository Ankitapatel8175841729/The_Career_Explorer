import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function SuggestedSkills({ uid }) {
    const [skills, setSkills] = useState([]);
    useEffect(() => {
        async function fetchSkills() {
            const snap = await getDocs(
                collection(db, "users", uid, "recommendation")
            );

            const allSkills = snap.docs.flatMap(d => d.data().skills || []);
            SetSkills([...new Set(allSkills)]);
        }
        fetchSkills();
    }, [uid]);

    return (
        <>
            <h2>Suggested Skills</h2>
            <ul>{skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </>
    );


}