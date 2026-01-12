import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{
      backgroundColor: "#c62828",
      padding: "15px",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h2>🧬 Disease Tracker</h2>
      <div>
        <Link to="/" style={{ color: "white", marginRight: "20px" }}>
          Report
        </Link>
        <Link to="/map" style={{ color: "white" }}>
          Live Map
        </Link>
      </div>
    </div>
  );
}
