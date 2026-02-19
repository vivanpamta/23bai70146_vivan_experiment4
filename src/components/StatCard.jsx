import React from "react";

export default function StatCard({ label, value }) {
  return (
    <div className="stat">
      <div className="muted small">{label}</div>
      <div className="statValue">{value}</div>
    </div>
  );
}
