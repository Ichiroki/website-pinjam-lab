import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Halo dunia!")
})

app.listen(port, () => {
    console.log(`Application starts at ${port}`)
})

