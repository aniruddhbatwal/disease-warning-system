import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [zones, setZones] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    // Chennai outbreak zone
    const outbreakZones = [
      { lat: 13.0827, lng: 80.2707, risk: "High" }, // Chennai
      { lat: 28.6139, lng: 77.2090, risk: "Medium" } // Delhi
    ];

    setZones(outbreakZones);

    // Get user location
    navigator.geolocation.getCurrentPosition((pos) => {
      const userLat = pos.coords.latitude;
      const userLng = pos.coords.longitude;

      outbreakZones.forEach((zone) => {
        const distance = Math.sqrt(
          Math.pow(zone.lat - userLat, 2) +
          Math.pow(zone.lng - userLng, 2)
        );

        // If user is near Chennai
        if (distance < 1 && zone.risk === "High") {
          setAlert("⚠️ High disease outbreak detected near Chennai. Please stay alert and avoid crowds.");
        }
      });
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

      <MapContainer center={[13.0827, 80.2707]} zoom={7} style={{ height: "90vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {zones.map((z, i) => (
          <CircleMarker
            key={i}
            center={[z.lat, z.lng]}
            radius={30}
            pathOptions={{
              color: z.risk === "High" ? "red" : "orange"
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
