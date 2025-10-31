// WidgetCard.jsx
import React from "react";

export default function WidgetCard({ title, children }) {
  return (
    <div className="widget-card">
      <h3 className="widget-title">{title}</h3>
      <div className="widget-content">{children}</div>
    </div>
  );
}
