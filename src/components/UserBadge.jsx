import React from "react";
import { useApp } from "../context/AppContext.jsx";

export default function UserBadge({ compact = false }) {
  const { user } = useApp();

  if (compact) {
    return <div className="pill">{user.name}</div>;
  }

  return (
    <div className="panel">
      <div className="row space">
        <div>
          <div className="kicker">Profile (Context)</div>
          <div className="big">{user.name}</div>
          <div className="muted small">{user.role} • {user.tagline}</div>
        </div>
        <div className="avatar">VS</div>
      </div>
    </div>
  );
}
