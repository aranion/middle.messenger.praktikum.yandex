const path = require("path");
const express = require('express');

const app = express();
const PORT = 3000;

// app.use(express.static(`${__dirname}/`));
app.use("/", express.static(path.resolve(__dirname, '../dist/')));
app.get(`/api/v1/text`, (req, res) => {
  res.status(200).send("Hello, World!");
})
app.put(`/api/v1/json`, (req, res) => {
  console.log(req.json)
  res.setHeader('Content-Type', 'application/json');
  res.status(201).send({ deleted: true });
})
app.listen(PORT, function () {
  console.log(`Сервер запущен на порту ${PORT}`);
}); 