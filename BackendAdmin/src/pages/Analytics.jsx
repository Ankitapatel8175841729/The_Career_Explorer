import { useEffect, useState } from "react";
export default function Analytics() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch("/analytics")
            .then(res => res.json())
            .then(data => setCount(data.totalRecommendations));
    }, []);

    return <h3>Total Recommendations:{count}</h3>
}