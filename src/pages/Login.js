// File: src/pages/Login.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logoAmikom from "../assets/amikom.png";
import { LogIn, ShieldCheck } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/jwt/create/", {
        username,
        password,
      });

      if (res.data && res.data.access) {
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("username", username);
        toast.success("Login berhasil");
        navigate("/");
      } else {
        toast.error("Login gagal: Token tidak ditemukan");
      }
    } catch (err) {
      toast.error("Login gagal: " + (err.response?.data?.detail || "Terjadi kesalahan"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#4B0082] font-sans">
      <Toaster position="top-center" />
      <header className="bg-[#2E005F] text-white py-6 shadow-md text-center text-3xl font-bold">
        <div className="flex justify-center items-center gap-4">
          <img src={logoAmikom} alt="Logo Amikom" className="h-10" />
          <span className="flex items-center gap-2">
            <ShieldCheck size={24} /> Login Mahasiswa
          </span>
        </div>
      </header>

      <main className="flex-1 flex justify-center items-center py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-2xl font-semibold mb-6 text-[#2E005F] flex items-center gap-2">
            <LogIn size={22} /> Silakan Login
          </h2>
          <div className="space-y-5">
            <input
              type="text"
              placeholder="NIM"
              className="border border-gray-300 rounded px-4 py-3 w-full focus:outline-none focus:ring focus:border-[#4B0082]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded px-4 py-3 w-full focus:outline-none focus:ring focus:border-[#4B0082]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={login}
              className="w-full text-lg bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <LogIn size={18} /> Login
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-[#1A0033] text-white text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} Sistem TA - Universitas Amikom. All rights reserved.
      </footer>
    </div>
  );
}
