const express = require('express')
const connection = require('./db')
const app = express()
const port = 3000

app.get('/bienvenida', (req, res) => {
  res.send('Hola mundo!')
})

app.get('/despedida', (req, res) => {
  res.send('Adios mundo!')
})

app.post('/guardar', (req, res) => {

  const sql = "INSERT INTO persona (id, nombre, apellido, edad) VALUES (?, ?)";
  const values = ['John', 'Doe', '14'];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log("Record inserted, ID:", result.insertId); // Access the auto-increment ID
  });

  res.send('Aquí guardo datos!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
