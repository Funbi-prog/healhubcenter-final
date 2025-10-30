import React from "react";

export default function ChatPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg, #f1ece7, #faf8f6)",
      }}
    >
      <h1 style={{ color: "#222", fontSize: "1.6rem" }}>
        Chat with <strong>Bimpe-AI</strong>
      </h1>
      <p style={{ color: "#555" }}>
        This is your placeholder chat interface. We'll build the full interactive UI next.
      </p>
    </div>
  );
}
