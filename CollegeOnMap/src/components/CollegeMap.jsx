import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { colleges } from "../data/colleges";

export default function CollegeMap() {
    return (
        <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "50px", width: "100%" }}
        >

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="@ OpenStreetMap contributors"
            />

            {colleges.map((college, index) => (
                <Marker key={index} position={[college.lat, college.lng]}>
                    <Popup>
                        <b>{college.name}</b>
                    </Popup>
                </Marker>
            ))}

        </MapContainer>
    );
}