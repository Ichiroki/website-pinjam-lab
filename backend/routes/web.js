import express from 'express'
import db from '../database/supabase.js'

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

WebRoutes.get('/api/validate-token', async (req, res) => {
    const token = req.query.token

    const record = await db.token_links.findUnique()
})

export default WebRoutes