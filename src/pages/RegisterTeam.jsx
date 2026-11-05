import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterTeam() {
  const [form, setForm] = useState({ name: "", city: "Lahore", format: "tape", maxPlayers: 13, description: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/teams", form);
      setMsg("Team created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to create team (login required)");
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "20px auto" }}>
      <h2 className="section-title">Register Your Team</h2>
      {msg && <p style={{ marginBottom: 12, color: msg.includes("success") ? "green" : "red" }}>{msg}</p>}
      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>Team Name</label>
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Sher Warriors" />
        </div>
        <div className="form-group">
          <label>City</label>
          <input name="city" value={form.city} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Format</label>
          <select name="format" value={form.format} onChange={handleChange}>
            <option value="tape">Tape Ball</option>
            <option value="hard">Hard Ball</option>
            <option value="tennis">Tennis Ball</option>
          </select>
        </div>
        <div className="form-group">
          <label>Max Players</label>
          <input type="number" name="maxPlayers" value={form.maxPlayers} onChange={handleChange} min={5} max={20} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
        </div>
        <button type="submit" className="btn btn-full">Create Team</button>
      </form>
    </div>
  );
}

export default RegisterTeam;
