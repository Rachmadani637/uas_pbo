// File: src/pages/Seminar.js
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LogOut,
  LayoutDashboard,
  ClipboardEdit,
  FileText,
  Users,
  CheckCircle,
  CalendarCheck,
  Menu,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import logoAmikom from "../assets/amikom.png";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Seminar() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [seminars, setSeminars] = useState([]);
  const username = localStorage.getItem("username") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/api/seminar/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSeminars(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Gagal mengambil data seminar");
      });
  }, [token]);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toast("Berhasil logout", { icon: "👋" });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex font-sans">
      <Toaster position="top-center" />

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ width: 64 }}
          animate={{ width: sidebarOpen ? 256 : 64 }}
          exit={{ width: 64 }}
          transition={{ duration: 0.3 }}
          className="bg-[#2E005F] text-white flex flex-col py-6 px-4 relative overflow-hidden"
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white mb-6 focus:outline-none absolute top-4 right-4"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-3 mb-6 mt-10">
            <img src={logoAmikom} alt="Logo" className="h-10" />
            {sidebarOpen && <span className="text-lg font-bold">Sistem TA</span>}
          </div>

          <nav className="flex flex-col gap-4 text-sm mt-6">
            <Link to="/" className="hover:text-yellow-300 flex items-center gap-2">
              <LayoutDashboard size={18} />
              {sidebarOpen && <span>Dashboard</span>}
            </Link>
            <Link to="/seminar" className="hover:text-yellow-300 flex items-center gap-2">
              <ClipboardEdit size={18} />
              {sidebarOpen && <span>Seminar</span>}
            </Link>
            <Link to="/bimbingan" className="hover:text-yellow-300 flex items-center gap-2">
              <FileText size={18} />
              {sidebarOpen && <span>Bimbingan</span>}
            </Link>
            <Link to="/penguji" className="hover:text-yellow-300 flex items-center gap-2">
              <Users size={18} />
              {sidebarOpen && <span>Penguji</span>}
            </Link>
            <Link to="/nilai" className="hover:text-yellow-300 flex items-center gap-2">
              <CheckCircle size={18} />
              {sidebarOpen && <span>Nilai</span>}
            </Link>
          </nav>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 bg-[#4B0082] py-14 px-8 relative">
        {/* Logout Button */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 mt-14">
          <h2 className="text-2xl font-semibold text-[#2E005F] mb-6 flex items-center gap-2">
            <CalendarCheck size={24} /> Halaman Seminar
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            Fitur ini akan menampilkan daftar jadwal seminar, status pengajuan, dan hasil penilaian seminar. Anda dapat melihat detail seminar Anda dan status persetujuan dari dosen pembimbing atau penguji.
          </p>

          {/* TABEL SEMINAR */}
          <div className="mt-6 overflow-x-auto">
            <table className="table-auto w-full text-sm border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Tanggal</th>
                  <th className="px-4 py-2 border">Tempat</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {seminars.map((item, index) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border">{new Date(item.tanggal).toLocaleString()}</td>
                    <td className="px-4 py-2 border">{item.tempat}</td>
                    <td className="px-4 py-2 border">{item.status}</td>
                  </tr>
                ))}
                {seminars.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      Belum ada data seminar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
