import { auth } from "../firebase";

export default function Exams() {
    const updateExam = async () => {
        const token = await auth.currentUser.getIdToken();

        await fetch("/updateExam", {
            method: "POST",
            headers: {
                "Authorization": "Bearer" + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "JEE",
                date: "2026-01-15"
            })
        });
    };

    return <button onClick={updateExam}>Update Exam</button>
}