import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [zones, setZones] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    // 1️⃣ Fetch live outbreak data from backend
    axios.get("http://localhost:5000/api/risk-data")
      .then(res => {
        setZones(res.data);

        // 2️⃣ Get user location
        navigator.geolocation.getCurrentPosition((pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;

          res.data.forEach((zone) => {
            const distance = Math.sqrt(
              Math.pow(zone.lat - userLat, 2) +
              Math.pow(zone.lng - userLng, 2)
            );

            // 3️⃣ Trigger alert if user is in HIGH risk zone
            if (distance < 1 && zone.risk === "High") {
              setAlert("⚠️ High disease outbreak detected in your area. Please stay alert and avoid crowds.");
            }
          });
        });
      })
      .catch(() => {
        console.error("Failed to load outbreak data");
      });
  }, []);

  return (
    <div>
      {alert && (
        <div style={{
          background: "red",
          color: "white",
          padding: "15px",
          textAlign: "center",
          fontWeight: "bold"
        }}>
          {alert}
        </div>
      )}

      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "90vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {zones.map((z, i) => (
          <CircleMarker
            key={i}
            center={[z.lat, z.lng]}
            radius={30}
            pathOptions={{
              color:
                z.risk === "High"
                  ? "red"
                  : z.risk === "Medium"
                  ? "orange"
                  : "green"
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
