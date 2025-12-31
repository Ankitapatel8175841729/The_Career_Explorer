import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function ProgressTracker({ uid }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        async function fetchProgress() {
            const snap = await getDoc(doc(db, "users", uid, "progress", "main"));
            if (snap.exists()) setProgress(snap.data().percent);
        }
        fetchProgress();
    }, [uid]);

    return (
        <>
            <h2>Progress</h2>
            <progress value={progress} max="100"></progress>
            <span>{progress}%</span>
        </>
    );
}