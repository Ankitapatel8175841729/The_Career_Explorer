import { auth } from "./firebase";
export default function Careers() {
    const addCareer = async () => {
        const token = await auth.currentUser.getIdToken();

        await fetch("/addCareer", {
            method: "POST",
            headers: {
                "Authorization": "Bearer" + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Software Engineer",
                stream: "Science",
                eligibility: "PCM",
                exams: ["JEE"],
                salary: "20LPA",
                scope: "High demand"
            })
        });

        alert("Career added");
    };

    return <button onClick={addCareer}>Add Career</button>;
}