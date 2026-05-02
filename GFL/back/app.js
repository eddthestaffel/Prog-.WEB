const express = require('express')
const connection = require('./db')
const app = express()
const port = 3000
app.use(express.json());

app.get('/bienvenida', (req, res) => {
  res.send('Hola mundo!')
})

app.get('/despedida', (req, res) => {
  res.send('Adios mundo!')
})

app.post('/guardar', (req, res) => {
  res.send('Ha guardado correctamente')
})

app.get('/usuario', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM usuarioq');
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/usuario', async (req, res) => {
  try {
    const query = 'INSERT INTO usuarioq (nombre, apellido, edad) VALUES (?, ?, ?)';
    const [result] = await connection.query(query, ["Juan", "Perez", 25]);

    res.status(201).json({
      mensaje: 'Usuario guardado con éxito',
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar en la base de datos' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})