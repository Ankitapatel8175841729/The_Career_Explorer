import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function QuizHistory({ uid }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        async function load() {
            const snap = await getDocs(collection(db, "users", uid, "quizResponses"));
            setHistory(snap.docs.map(d => d.data()));
        }
        load();
    }, [uid]);

    return (
        <>
            <h2>Quiz History</h2>
            {history.map((q, i) => (
                <p key={i}>Marks:{q.marks} | Interests:{q.interests.join(",")}</p>
            ))}
        </>
    );
}