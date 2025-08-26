import express from 'express'

const WebRoutes = express()

WebRoutes.post("/api/generate-token", async (req, res) => {
    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    await db.temporary_links.create({
        
    })
})

WebRoutes.get('/api/validate-token', async (req, res) => {
    const token = req.query.token

    const record = await db.token_links.findUnique()
})