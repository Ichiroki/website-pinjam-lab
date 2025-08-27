import express from 'express'
import db from '../database/supabase.js'
import crypto from 'crypto'

const WebRoutes = express()

WebRoutes.post("/api/generate-token", async (req, res) => {
    try {
        const { role } = req.query
        if(!role || !["dosen", "mahasiswa"].includes(role)) {
            return res.status(400).json({error: "Role tidak valid"})
        }
        const token = crypto.randomUUID()
        const expiresAt = new Date(Date.now() + 1 * 60 * 1000)

        const { data, error } = await db
        .from("temporary_links")
        .insert(
            {
                token: token,
                role: role,
                expires_at: expiresAt
            }
        )
        .select()

        if(error) {
            return res.status(500).json({error: error.message})
        }

        return res.json({
            message: "Token berhasil dibuat",
            token: data[0].token,
            role: data[0].role,
            expires_at: data[0].expires_at,
            status: "success"
        })
    } catch(e) {
        return res.status(400).json({message: e.message})
    }
})

WebRoutes.get("/api/validate-token", async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ valid: false, message: "Token tidak diberikan" });
    }

    const { data, error } = await db
      .from("temporary_links")
      .select("expires_at, role")
      .eq("token", token)
      .maybeSingle(); // ambil 1 record saja

    if (error) {
      return res.status(500).json({ valid: false, message: error.message });
    }

    if (!data) {
      return res.json({ valid: false, message: "Token tidak ditemukan" });
    }

    // cek expired
    if (new Date(data.expires_at) < new Date()) {
      return res.json({ valid: false, message: "Token sudah kadaluarsa" });
    }

    return res.json({
      valid: true,
      role: data.role,
      expires_at: data.expires_at,
      message: "Token masih valid"
    });
  } catch (err) {
    return res.status(500).json({ valid: false, message: err.message });
  }
});


export default WebRoutes