import express from 'express'
import WebRoutes from './routes/web.js'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors({
    origin: '*'
}))

app.use(WebRoutes)
app.listen(port, () => {
    console.log(`Application starts at ${port}`)
})

