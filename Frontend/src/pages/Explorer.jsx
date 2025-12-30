import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();

export default function Explorer() {
    const [stream, setStream] = useState("Science_PCM");
    const [state, setState] = useState("");
    const [maxFees, setMaxFees] = useState(200000);
    const [exams, setExams] = useState([]);
    const [colleges, setColleges] = useState([]);

    const fetchData = async () => {
        const getExams = httpsCallable(functions, "getExamsByStream");
        const getColleges = httpsCallable(functions, "getColleges");

        const examsRes = await getExams({ stream });
        const collegesRes = await getColleges({ stream, state, maxFees });

        setExams(examsRes.data);
        setColleges(collegesRes.data);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">College & Exam Explorer</h1>

            <div className="flex gap-4">
                <input
                    placeholder="State (optional)"
                    className="border p-2"
                    onChange={e => setState(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Max Fees"
                    className="border p-2"
                    value={maxFees}
                    onChange={e => setMaxFees(+e.target.value)}
                />

                <button
                    onClick={fetchData}
                    className="bg-blue-600 text-white px-4 py-2"
                >
                    Search
                </button>
            </div>

            <section>
                <h2 className="text-xl font-semibold">Exams</h2>
                {exams.map((e, i) => (
                    <div key={i} className="border p-3 mt-2">
                        <h3 className="font-bold">{e.name}</h3>
                        <p>{e.conductedBy} | {e.level}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="text-xl font-semibold">Colleges</h2>
                {colleges.map((c, i) => (
                    <div key={i} className="border p-3 mt-2">
                        <h3 className="font-bold">{c.name}</h3>
                        <p>{c.city}, {c.state}</p>
                        <p>Fees: ₹{c.feesPerYear}/year</p>
                    </div>
                ))}
            </section>
        </div>
    );
}
