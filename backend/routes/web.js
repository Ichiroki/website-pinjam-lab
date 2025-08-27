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

WebRoutes.post('/api/peminjaman', async (req, res) => {
  console.log(process.env.TELEGRAM_BOT_TOKEN)

  const {
    nama,
    nomor_hp,
    npm_nidn,
    tanggal,
    jam,
    keperluan,
    role,
    token
  } = req.body

  const datetime = new Date(`${tanggal}T${jam}:00+07:00`)

  const {error} = await db
  .from("peminjaman")
  .insert({
    name: nama,
    nomor: nomor_hp,
    token_id: token,
    nim_nidn: npm_nidn,
    role,
    tanggal,
    jam: datetime.toISOString(),
    keperluan,
  })

  if(error) return res.status(500).json({ message: error })

  const userchat = await fetch('https://api.telegram.org/bot'+ process.env.TELEGRAM_BOT_TOKEN +'/getUpdates', {
    method: "GET",
  })

  const userchatData = await userchat.json()
  
  const chatId = userchatData.result[0].message.chat.id
  console.log(chatId)
  const text = `
    📌 *Peminjaman Lab Berhasil*
    👤 Nama: ${nama}
    📞 Nomor: ${nomor_hp}
    🆔 NIM/NIDN: ${npm_nidn}
    📅 Tanggal: ${tanggal}
    ⏰ Jam: ${jam}
    🎯 Keperluan: ${keperluan}
  `;

  const test = await fetch('https://api.telegram.org/bot8429336561:AAEeEPdRGxn4qVs0zPhIYbmO56ONI30GyPg/sendMessage', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown"
    })
  })

  // const data = await test.json()

  res.json({ message: "Form berhasil dibuat", chat: chatId })
})

export default WebRoutes