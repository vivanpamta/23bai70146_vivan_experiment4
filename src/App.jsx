import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Board from "./pages/Board.jsx";
import Analytics from "./pages/Analytics.jsx";
import { useApp } from "./context/AppContext.jsx";

export default function App() {
  const { theme } = useApp();

  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">
        <span>Experiment 4 • React Router + Context + Reducer + Memo</span>
      </footer>
    </div>
  );
}
