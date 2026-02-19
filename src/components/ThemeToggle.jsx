import React from "react";
import { useApp } from "../context/AppContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();

  return (
    <button className="btn secondary" onClick={toggleTheme}>
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
