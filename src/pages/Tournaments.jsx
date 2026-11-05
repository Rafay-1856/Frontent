import React, { useEffect, useState } from "react";
import api from "../services/api";

function Tournaments() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/tournaments")
      .then((res) => setList(res.data))
      .catch(() => {
        setList([
          { _id: "1", title: "Lahore Tape Ball Cup", ground: "Gulberg Ground", date: "2026-11-15", time: "10:00 AM", status: "open", format: "tape", city: "Lahore" },
          { _id: "2", title: "College Premier League", ground: "University Ground", date: "2026-11-16", time: "2:00 PM", status: "open", format: "hard", city: "Lahore" },
          { _id: "3", title: "Night Hard Ball Series", ground: "Model Town", date: "2026-11-14", time: "8:00 PM", status: "open", format: "hard", city: "Lahore" },
          { _id: "4", title: "Weekend Friendly", ground: "Near You", date: "2026-11-08", time: "5:00 PM", status: "open", needPlayers: 3, format: "tape", city: "Lahore" },
        ]);
      });
  }, []);

  const filtered = filter === "all" ? list : list.filter((t) => t.format === filter);

  return (
    <div>
      <h2 className="section-title">All Tournaments</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["all", "tape", "hard"].map((f) => (
          <button
            key={f}
            className={`btn ${filter === f ? "" : "btn-outline"}`}
            style={{ padding: "8px 14px", fontSize: 13 }}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {filtered.map((t) => (
        <div className="card" key={t._id}>
          <h3>{t.title}</h3>
          <p className="meta">{t.ground} • {t.time} • {t.city}</p>
          <span className={`badge badge-${t.status === "full" ? "full" : "open"}`}>
            {t.status === "open" ? (t.needPlayers ? `Need ${t.needPlayers}` : "Open") : "Full"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Tournaments;
