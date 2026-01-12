🧬 Disease Spread Early-Warning System

A real-time, location-based disease outbreak detection platform that collects anonymous symptom reports, analyzes regional trends, and visualizes early warning signals on a live map — before hospitals get overwhelmed.

Think of it as “Google Maps for Disease Spread.”

🌍 Problem Statement

In many regions, disease outbreaks (viral fever, dengue, flu, food poisoning, COVID-like illnesses) are detected only after hospitals begin to overflow.

This delayed detection causes:

Rapid community spread

Healthcare system overload

Unnecessary loss of lives

There is currently no real-time, community-driven early-warning system that:

Tracks early symptoms

Detects abnormal illness clusters

Warns people before outbreaks escalate

💡 Solution

The Disease Spread Early-Warning System enables people to anonymously report symptoms with their location.

A backend analytics engine continuously:

Groups reports by region

Compares daily cases against historical baselines

Identifies abnormal spikes

Classifies areas into Low / Medium / High risk zones

Results are visualized on a live interactive map, and users in high-risk zones receive early warnings.

🚀 Key Features

📍 Mandatory geolocation-based symptom reporting

🧠 Python-powered outbreak detection analytics

🗺️ Live disease risk map (Low / Medium / High)

⚠️ Real-time alerts for users in high-risk zones

🧩 Microservice architecture (Frontend + Backend + Analytics)

🔐 Anonymous reporting (no personal identity stored)

🧱 System Architecture
React Frontend
      ↓
Node.js + Express Backend
      ↓
MongoDB Atlas
      ↓
Python FastAPI Analytics Engine
      ↓
Risk Data → Frontend Map + Alerts

🛠️ Technology Stack
Frontend

React.js

React Router

Leaflet.js + OpenStreetMap

Axios

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

Analytics Engine

Python

FastAPI

Pandas

Deployment

Frontend: Vercel

Backend: Render

Analytics: Render

Database: MongoDB Atlas

📁 Project Structure
disease-warning-system/
├── frontend/        # React frontend
├── backend/         # Node.js API server
├── analytics/       # Python analytics service
└── README.md

⚙️ How It Works (Step-by-Step)

User Reports Symptoms

Selects symptoms

Grants location access

Data is sent anonymously to backend

Data Storage

Reports stored in MongoDB with timestamp & location

Analytics Processing

Python service groups data by region

Compares today’s cases vs 7-day average

Flags abnormal spikes

Risk Classification

🟢 Low Risk

🟡 Medium Risk

🔴 High Risk

Visualization & Alerts

Live map updates automatically

Users in high-risk zones receive warnings

🧪 Running Locally
1️⃣ Start Analytics Service
cd analytics
uvicorn main:app --reload --port 8000

2️⃣ Start Backend
cd backend
node server.js

3️⃣ Start Frontend
cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

🔐 Privacy & Ethics

No user identity is collected

Location is used only for outbreak detection

Data is anonymized and aggregated

System enforces user consent for geolocation

🏆 Use Cases

Early outbreak detection for communities

Hospital resource planning

Public health monitoring

Government & NGO health response

Hackathons, research, and startups

🔮 Future Enhancements

Auto-refresh live map

SMS / Email alerts for high-risk zones

Admin dashboard for hospitals

Pincode auto-detection from coordinates

Machine learning-based trend prediction

👨‍💻 Contributors

Anirudh Batwal – Backend, Analytics, System Architecture

Frontend Contributors – UI & Visualization

📜 License

This project is open-source and available under the MIT License.

⭐ Final Note

This project demonstrates:

Full-stack engineering

Microservice architecture

Real-time data analytics

Social impact through technology

If you find this useful, consider ⭐ starring the repository.
