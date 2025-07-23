// File: src/pages/Dashboard.js
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LogOut,
  BookOpenCheck,
  FilePlus,
  UploadCloud,
  LayoutDashboard,
  FileText,
  ClipboardEdit,
  Menu,
  X,
  Users,
  CheckCircle,
  Info,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import logoAmikom from "../assets/amikom.png";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [judul, setJudul] = useState("");
  const [proposal, setProposal] = useState(null);
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
      const res = await axios.get("http://127.0.0.1:8000/api/tugas-akhir/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (err) {
      toast.error("Gagal fetch data");
    }
  };

  const tambahTA = async () => {
    if (!proposal) {
      toast.error("Silakan upload file proposal terlebih dahulu");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("status", "diajukan");
      formData.append("proposal", proposal);

      await axios.post("http://127.0.0.1:8000/api/tugas-akhir/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchData();
      setJudul("");
      setProposal(null);
      toast.success("Judul dan proposal berhasil diajukan");
    } catch (err) {
      toast.error("Gagal menambah data");
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
            <Link to="/" className="text-yellow-300 flex items-center gap-2">
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
            Selamat datang, <span className="text-blue-800">{username}</span>
          </h2>

          {/* Informasi Proyek */}
          <div className="bg-purple-50 border-l-4 border-[#4B0082] p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#4B0082]">
              <Info size={20} /> Informasi Sistem TA D3 Amikom
            </h3>
            <p className="text-sm text-gray-700 mt-2">
              Sistem ini dirancang untuk membantu mahasiswa D3 Universitas Amikom Yogyakarta dalam mengelola proses Tugas Akhir secara online. Mahasiswa dapat:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
              <li>Mengajukan judul dan proposal Tugas Akhir</li>
              <li>Melihat dan mencatat bimbingan dengan dosen</li>
              <li>Mengetahui jadwal seminar dan statusnya</li>
              <li>Melihat dosen penguji yang ditetapkan</li>
              <li>Mengecek nilai akhir dan keterangan kelulusan</li>
            </ul>
          </div>

          {/* Form Pengajuan */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#2E005F] flex items-center gap-2">
              <FilePlus size={20} /> Ajukan Judul & Proposal TA
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Judul Tugas Akhir"
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-[#4B0082]"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                />
                <input
                  type="file"
                  accept="application/pdf"
                  className="file:border file:border-[#4B0082] file:px-4 file:py-2 file:rounded file:bg-purple-100 text-sm"
                  onChange={(e) => setProposal(e.target.files[0])}
                />
              </div>
              <button
                onClick={tambahTA}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
              >
                <UploadCloud size={16} /> Ajukan
              </button>
            </div>
          </div>

          {/* Daftar TA */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#2E005F] flex items-center gap-2">
              <BookOpenCheck size={20} /> Daftar Tugas Akhir
            </h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-l-4 border-[#4B0082] bg-purple-50 rounded-md shadow-sm"
                >
                  <h3 className="text-md font-medium text-[#2E005F]">{item.judul}</h3>
                  <p className="text-sm text-[#4B0082]">Status: {item.status}</p>
                </div>
              ))}
              {data.length === 0 && (
                <p className="text-center text-gray-500">Belum ada pengajuan tugas akhir.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
