const express = require('express')
const connection = require('./db')
const app = express()
const port = 3000
app.use(express.json());

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

app.get('/usuario/:id', async (req, res) => {
  try {
    const id = req.params.Juan
    const query = 'SELECT * FROM usuarioq where id = ?';
    const [rows] = await db.query(query, [id]);
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

app.delete('/usuario/:id', async (req, res) => {
  try {
    const id = req.params.Juan
    const query = 'DELETE FROM usuarioq where id = ?';
    const [rows] = await db.query(query, [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})