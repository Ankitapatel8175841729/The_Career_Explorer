import Careers from "./Careers";
import Exams from "./Exams";
import Analytics from "./Analytics";

export default function Dashboard() {
    return (
        <div>
            <h1>Admin dashboard</h1>
            <Careers />
            <Exams />
            <Analytics />
        </div>
    );
}