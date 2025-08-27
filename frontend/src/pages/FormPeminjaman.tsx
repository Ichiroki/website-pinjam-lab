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
    nomor_hp: "",
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/peminjaman", {
        ...form,
        role,
        token,
      });
      // const res = await axios.post("http://localhost:3000/api/peminjaman");
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.message || "Terjadi error");
    }
  };

  // if (loading) return <p>Memeriksa token...</p>;
  // if (!valid) return <p>Link tidak valid atau kadaluarsa</p>;

  return (
    <div className="form-peminjaman h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-2">
            <h1 className="text-xl mb-4">Form Peminjaman Lab ({role})</h1>
            <div>
              <label htmlFor="nama" className="block" style={{marginBottom: "5px"}}>Nama</label>
              <input
                  id="nama"
                  name="nama"
                  type="text"
                  placeholder="Nama"
                  className="block border p-2 mb-2 w-full"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  required
              />
            </div>
            <div>
              <label htmlFor="nomor"  className="block" style={{marginBottom: "5px"}}>Nomor HP</label>
              <input
                  name="nomor"
                  type="text"
                  placeholder="Nomor HP"
                  className="block border p-2 mb-2 w-full"
                  value={form.nomor_hp}
                  onChange={(e) => setForm({ ...form, nomor_hp: e.target.value })}
                  required
              />
            </div>
            <div>
              <label htmlFor={role === "dosen" ? "nidn" : "npm"}  className="block" style={{marginBottom: "5px"}}>{role === "dosen" ? "NIDN" : "NPM"}</label>
              <input
                  name={role === "dosen" ? "nidn" : "npm"}
                  type="text"
                  placeholder={role === "dosen" ? "NIDN" : "NPM"}
                  className="block border p-2 mb-2 w-full"
                  value={form.npm_nidn}
                  onChange={(e) => setForm({ ...form, npm_nidn: e.target.value })}
                  required
              />
            </div>
            <div>
              <label htmlFor="tgl_pinjam"  className="block" style={{marginBottom: "5px"}}>Tanggal Peminjaman</label>
              <input
                  name="tgl_pinjam"
                  type="date"
                  className="block border p-2 mb-2 w-full"
                  value={form.tanggal}
                  onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                  required
              />
            </div>
            <div>
              <label htmlFor="jam"  className="block" style={{marginBottom: "5px"}}>Jam Peminjaman</label>
              <input
                  type="time"
                  className="block border p-2 mb-2 w-full"
                  value={form.jam}
                  onChange={(e) => setForm({ ...form, jam: e.target.value })}
                  required
              />
            </div>
            <div>
              <label htmlFor="keperluan"  className="block" style={{marginBottom: "5px"}}>Keperluan</label>
              <textarea
                  name="keperluan"
                  placeholder="Keperluan"
                  className="block border p-2 mb-2 w-full"
                  value={form.keperluan}
                  onChange={(e) => setForm({ ...form, keperluan: e.target.value })}
                  required
              />
            </div>
            <div>
              <button
                  type="submit"
                  className="form-submit transition bg-blue-600 text-white p-2 rounded hover:bg-blue-400"
              >
                  Submit
              </button>
            </div>
        </form>
    </div>
  );
}

export default FormPeminjaman;
