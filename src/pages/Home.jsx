import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import UserBadge from "../components/UserBadge.jsx";

export default function Home() {
  const { user, state } = useApp();

  return (
    <section className="card">
      <UserBadge />

      <h1 className="title">Smart Taskboard</h1>
      <p className="muted">
        A mini productivity app demonstrating <b>Router</b>, <b>Context</b>, <b>Reducer</b>, and <b>Memo</b>.
      </p>

      <div className="grid2">
        <div className="panel">
          <h3>Quick Summary</h3>
          <p className="muted">Welcome, {user.name} 👋</p>
          <ul className="list">
            <li>Total tasks: <b>{state.tasks.length}</b></li>
            <li>Favorites: <b>{Object.keys(state.favorites).length}</b></li>
          </ul>
        </div>

        <div className="panel">
          <h3>Go Next</h3>
          <div className="btnRow">
            <Link className="btn" to="/board">Open Board</Link>
            <Link className="btn secondary" to="/analytics">View Analytics</Link>
          </div>
          <p className="muted small">
            Board = add/toggle/delete + favorites. Analytics = useMemo stats.
          </p>
        </div>
      </div>
    </section>
  );
}
