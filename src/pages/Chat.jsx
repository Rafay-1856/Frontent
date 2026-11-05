import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { senderName: "Ahmed", text: "Kal practice 5 baje?", me: false },
    { senderName: "You", text: "Haan, Model Town ground", me: true },
    { senderName: "Bilal", text: "Kitne players aa rahe?", me: false },
    { senderName: "You", text: "9 confirmed, 2 pending", me: true },
  ]);
  const [text, setText] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages([...messages, { senderName: user?.name || "You", text, me: true }]);
    setText("");
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2 className="section-title">Team Chat</h2>
      <div className="card" style={{ height: 400, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.me ? "flex-end" : "flex-start",
              background: m.me ? "#22c55e" : "#e8f5ee",
              color: m.me ? "white" : "#1a1a1a",
              padding: "8px 14px",
              borderRadius: 12,
              maxWidth: "75%",
            }}
          >
            {!m.me && <small style={{ opacity: 0.7 }}>{m.senderName}</small>}
            <div>{m.text}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={send} style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #d1d5db" }}
        />
        <button type="submit" className="btn">Send</button>
      </form>
    </div>
  );
}

export default Chat;
