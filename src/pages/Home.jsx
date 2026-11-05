import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    api.get("/tournaments")
      .then((res) => setTournaments(res.data.slice(0, 5)))
      .catch(() => {
        // Demo data if backend offline
        setTournaments([
          { _id: "1", title: "Lahore Tape Ball Cup", ground: "Gulberg Ground", date: "2026-11-15", time: "10:00 AM", status: "open", format: "tape" },
          { _id: "2", title: "College Premier League", ground: "University Ground", date: "2026-11-16", time: "2:00 PM", status: "open", format: "hard" },
          { _id: "3", title: "Night Hard Ball Series", ground: "Model Town", date: "2026-11-14", time: "8:00 PM", status: "open", format: "hard" },
          { _id: "4", title: "Weekend Friendly", ground: "Near You", date: "2026-11-08", time: "5:00 PM", status: "open", needPlayers: 3, format: "tape" },
        ]);
      });
  }, []);

  return (
    <div>
      <div className="hero">
        <h1>CricSher</h1>
        <p>Local Cricket. Real Connections.</p>
        <Link to="/register-team" className="btn">Register Your Team</Link>
      </div>

      <h2 className="section-title">🏆 Tournament Updates</h2>
      {tournaments.map((t) => (
        <div className="card" key={t._id}>
          <h3>{t.title}</h3>
          <p className="meta">
            {t.ground || t.city} • {t.time || new Date(t.date).toLocaleDateString()} • {t.format}
          </p>
          <span className={`badge badge-${t.status === "full" ? "full" : "open"}`}>
            {t.status === "open" ? (t.needPlayers ? `Need ${t.needPlayers} players` : "Open") : "Full"}
          </span>
        </div>
      ))}
      <Link to="/tournaments" className="btn btn-outline" style={{ marginTop: 12 }}>View All Tournaments</Link>
    </div>
  );
}

export default Home;
