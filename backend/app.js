import express from 'express'
import WebRoutes from './routes/web.js'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
const port = 3000

dotenv.config()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ["Content-Type"]
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(WebRoutes)
app.listen(port, () => {
    console.log(`Application starts at ${port}`)
})

