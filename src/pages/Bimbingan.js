// File: src/pages/Bimbingan.js
import { useEffect, useState } from "react";
import {
  LogOut,
  BookOpenCheck,
  ClipboardList,
  LayoutDashboard,
  FileText,
  ClipboardEdit,
  Menu,
  X,
  Users,
  CheckCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import logoAmikom from "../assets/amikom.png";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Bimbingan() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [catatan, setCatatan] = useState("");
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const username = localStorage.getItem("username") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/bimbingan/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      toast.error("Gagal mengambil data bimbingan");
    }
  };

  const tambahBimbingan = async () => {
    if (!catatan.trim()) {
      toast.error("Catatan tidak boleh kosong");
      return;
    }
    try {
      const res = await fetch("http://127.0.0.1:8000/api/bimbingan/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ catatan }),
      });
      if (res.ok) {
        toast.success("Catatan bimbingan ditambahkan");
        setCatatan("");
        fetchData();
      } else {
        toast.error("Gagal menambahkan catatan");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan");
    }
  };

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
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 space-y-10 mt-14">
          <h2 className="text-xl font-semibold text-[#2E005F]">
            Selamat datang di Halaman Bimbingan, <span className="text-blue-800">{username}</span>
          </h2>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#2E005F] flex items-center gap-2">
              <ClipboardList size={20} /> Tambahkan Catatan Bimbingan
            </h2>
            <div className="space-y-4">
              <textarea
                placeholder="Catatan bimbingan..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-[#4B0082]"
                rows={3}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
              ></textarea>
              <button
                onClick={tambahBimbingan}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
              >
                Tambahkan
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#2E005F] flex items-center gap-2">
              <BookOpenCheck size={20} /> Riwayat Bimbingan
            </h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {data.length > 0 ? (
                data.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 border-l-4 border-[#4B0082] bg-purple-50 rounded-md shadow-sm"
                  >
                    <p className="text-sm text-[#4B0082]">{item.catatan}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Belum ada catatan bimbingan.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
