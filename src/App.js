// File: src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Seminar from "./pages/Seminar";
import Bimbingan from "./pages/Bimbingan";
import Penguji from "./pages/Penguji";
import Nilai from "./pages/Nilai";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/seminar" element={token ? <Seminar /> : <Navigate to="/login" />} />
        <Route path="/bimbingan" element={token ? <Bimbingan /> : <Navigate to="/login" />} />
        <Route path="/penguji" element={token ? <Penguji /> : <Navigate to="/login" />} />
        <Route path="/nilai" element={token ? <Nilai /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
