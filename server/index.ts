const path = require("path")
const express = require('express')
const fallback = require('express-history-api-fallback')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(fallback('/', { root: path.resolve(__dirname, '../dist') }))
app.use("*", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../dist'))
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`)
}) 