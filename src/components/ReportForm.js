import { useState } from "react";
import axios from "axios";

export default function ReportForm() {
  const [symptoms, setSymptoms] = useState("");
  const [status, setStatus] = useState("");

  const submit = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        axios.post("http://localhost:5000/report", {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          pincode: "560001",
          symptoms: symptoms.split(",")
        })
        .then(() => {
          setStatus("✅ Symptoms submitted successfully");
          setSymptoms("");
        })
        .catch(() => {
          setStatus("⚠️ Backend not running yet");
        });
      },
      () => {
        setStatus("❌ Location access denied");
      }
    );
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>🧬 Report Your Symptoms</h2>

      <textarea
  rows="4"
  placeholder="Describe your symptoms (e.g. fever, dry cough, headache, body pain, nausea...)"
  value={symptoms}
  onChange={(e) => setSymptoms(e.target.value)}
  style={{
    padding: "12px",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  }}
/>


      <br /><br />

      <button onClick={submit} style={{ padding: "10px" }}>
        Submit
      </button>

      <p>{status}</p>
    </div>
  );
}
