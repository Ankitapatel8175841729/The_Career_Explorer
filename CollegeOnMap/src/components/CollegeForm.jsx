import { useState } from "react";

export default function CollegeForm() {
    const [address, setAddress] = useState("");

    async function geocodeAddress() {
        const res = await fetch(
            `https://nomination.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await res.json();

        if (data.length > 0) {
            alert(`Lat:${data[0].lat}, Lng:$(data[0].lon)`);
        } else {
            alert("Location not found");
        }
    }

    return (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <input
                placeholder="Enter college address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                style={{ width: "300px", padding: "8px" }}
            />

            <br />
            <button onClick={geocodeAddress} style={{ margintop: "100px" }} >
                Get Location
            </button>
        </div>
    );
}