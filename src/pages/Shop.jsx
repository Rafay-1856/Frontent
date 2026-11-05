import React, { useEffect, useState } from "react";
import api from "../services/api";

function Shop() {
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState("all");

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => {
        setProducts([
          { _id: "1", name: "SS Soft Pro Bat", category: "bat", price: 4500 },
          { _id: "2", name: "Tape Ball (Pack 6)", category: "ball", price: 800 },
          { _id: "3", name: "SG Cricket Tape", category: "tape", price: 350 },
          { _id: "4", name: "Batting Pads", category: "pads", price: 2200 },
          { _id: "5", name: "Wicket Keeping Gloves", category: "gloves", price: 1800 },
          { _id: "6", name: "Full Kit (Junior)", category: "kit", price: 6500 },
        ]);
      });
  }, []);

  const filtered = cat === "all" ? products : products.filter((p) => p.category === cat);

  return (
    <div>
      <h2 className="section-title">🛒 Cricket Shop</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {["all", "bat", "ball", "tape", "pads", "gloves", "kit"].map((c) => (
          <button
            key={c}
            className={`btn ${cat === c ? "" : "btn-outline"}`}
            style={{ padding: "6px 12px", fontSize: 13 }}
            onClick={() => setCat(c)}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid-2">
        {filtered.map((p) => (
          <div className="card" key={p._id}>
            <h3>{p.name}</h3>
            <p className="meta">{p.category}</p>
            <p style={{ fontWeight: 700, color: "#22c55e", fontSize: 18 }}>Rs {p.price}</p>
            <button className="btn" style={{ marginTop: 10, width: "100%" }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
