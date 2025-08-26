import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function FormPeminjaman() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const role = searchParams.get("role");

  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nama: "",
    npm_nidn: "",
    tanggal: "",
    jam: "",
    keperluan: "",
  });

  const validateToken = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/validate-token?token=${token}`
      );
      setValid(res.data.valid);
    } catch (err) {
      setValid(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/submit-loan", {
        ...form,
        role,
        token,
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Terjadi error");
    }
  };

  if (loading) return <p>Memeriksa token...</p>;
  if (!valid) return <p>Link tidak valid atau kadaluarsa</p>;

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <h1 className="text-xl mb-4">Form Peminjaman Lab ({role})</h1>

      <input
        type="text"
        placeholder="Nama"
        className="block border p-2 mb-2"
        value={form.nama}
        onChange={(e) => setForm({ ...form, nama: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder={role === "dosen" ? "NIDN" : "NPM"}
        className="block border p-2 mb-2"
        value={form.npm_nidn}
        onChange={(e) => setForm({ ...form, npm_nidn: e.target.value })}
        required
      />
      <input
        type="date"
        className="block border p-2 mb-2"
        value={form.tanggal}
        onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
        required
      />
      <input
        type="time"
        className="block border p-2 mb-2"
        value={form.jam}
        onChange={(e) => setForm({ ...form, jam: e.target.value })}
        required
      />
      <textarea
        placeholder="Keperluan"
        className="block border p-2 mb-2"
        value={form.keperluan}
        onChange={(e) => setForm({ ...form, keperluan: e.target.value })}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-400"
      >
        Submit
      </button>
    </form>
  );
}

export default FormPeminjaman;
