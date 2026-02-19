import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import UserBadge from "./UserBadge.jsx";

const linkClass = ({ isActive }) => (isActive ? "link active" : "link");

export default function Navbar() {
  return (
    <header className="nav" role="banner">
      <div className="navLeft">
        <div className="brand" aria-label="App name">
          ⚡ Taskboard
          <span className="brandSub">Experiment 4</span>
        </div>

        <nav className="navLinks" aria-label="Primary navigation">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/board" className={linkClass}>
            Board
          </NavLink>
          <NavLink to="/analytics" className={linkClass}>
            Analytics
          </NavLink>
        </nav>
      </div>

      <div className="navRight">
        <UserBadge compact />
        <ThemeToggle />
      </div>
    </header>
  );
}
