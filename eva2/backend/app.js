const express = require('express')
const db = require('./db');
const app = express()
const port = 3000
app.use(express.json());

app.get('/canchas', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM canchas_deportivas');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
})
app.get('/canchas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = 'SELECT * FROM canchas_deportivas WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }

})

app.post('/canchas', async (req, res) => {
    const { nombre, tipo_superficie, capacidad_personas, precio_hora, horario_apertura, horario_cierre } = req.body; // Extraemos los datos del cuerpo de la petición
    // Validación básica
    if (!nombre || !tipo_superficie || !capacidad_personas || !precio_hora || !horario_apertura || !horario_cierre) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        // Usamos "?" como placeholders para prevenir inyección SQL
        const query = 'INSERT INTO canchas_deportivas (nombre, tipo_superficie, capacidad_personas, precio_hora, horario_apertura, horario_cierre) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [nombre, tipo_superficie, capacidad_personas, precio_hora, horario_apertura, horario_cierre]);
        res.status(201).json({
            mensaje: 'Usuario guardado con éxito',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
})

app.put('/canchas/:id', async (req, res) => {
    var id = req.params.id;
    const { nombre, tipo_superficie, capacidad_personas, precio_hora, horario_apertura, horario_cierre } = req.body; // Extraemos los datos del cuerpo de la petición
    // Validación básica
    if (!nombre || !tipo_superficie || !capacidad_personas || !precio_hora || !horario_apertura || !horario_cierre) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        // Usamos "?" como placeholders para prevenir inyección SQL
        const query = 'UPDATE canchas_deportivas SET nombre= ?, tipo_superficie=?, capacidad_personas=?, precio_hora=?, horario_apertura=?, horario_cierre=?  where id = ? ';
        console.log(query);
        const [result] = await db.query(query, [nombre, tipo_superficie, capacidad_personas, precio_hora, horario_apertura, horario_cierre, id]);
        res.status(201).json({
            mensaje: 'Usuario guardado con éxito',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
})

app.delete('/canchas/:id', async (req, res) => {
    var id = req.params.id;
    try {
        const query = 'DELETE FROM canchas_deportivas WHERE id = ?';
        const [result] = await db.query(query, [id]);
        res.status(201).json({
            mensaje: 'Cancha eliminada con éxito'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


/// APARTADO DE RESTAURANTE SIIIIII

app.get('/menu', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM menu_restaurante');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
})
app.get('/menu/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = 'SELECT * FROM menu_restaurante WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }

})

/*Dentro de post y put de menú se acepta el 0 como mayor o igual, más no tener calorias negativas*/

app.post('/menu', async (req, res) => {
    const { nombre_plato, descripcion, precio, categoria, calorias, disponible } = req.body; // Extraemos los datos del cuerpo de la petición
    // Validación básica
    if (!nombre_plato || !descripcion || !precio || !categoria || calorias == null || disponible == null) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    if (calorias < 0) {
        return res.status(400).json({
            error: 'Las calorías no pueden ser negativas'
        });
    }
    try {
        // Usamos "?" como placeholders para prevenir inyección SQL
        const query = 'INSERT INTO menu_restaurante (nombre_plato, descripcion, precio, categoria, calorias, disponible) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [nombre_plato, descripcion, precio, categoria, calorias, disponible]);
        res.status(201).json({
            mensaje: 'Plato agregado con éxito',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
})

app.put('/menu/:id', async (req, res) => {
    var id = req.params.id;
    const { nombre_plato, descripcion, precio, categoria, calorias, disponible } = req.body; // Extraemos los datos del cuerpo de la petición
    // Validación básica
    if (!nombre_plato || !descripcion || !precio || !categoria || calorias == null || disponible == null) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    if (calorias < 0) {
        return res.status(400).json({
            error: 'Las calorías no pueden ser negativas'
        });
    }
    try {
        // Usamos "?" como placeholders para prevenir inyección SQL
        const query = 'UPDATE menu_restaurante SET nombre_plato= ?, descripcion=?, precio=?, categoria=?, calorias=?, disponible=?  where id = ? ';
        console.log(query);
        const [result] = await db.query(query, [nombre_plato, descripcion, precio, categoria, calorias, disponible, id]);
        res.status(201).json({
            mensaje: 'Plato actualizado con éxito',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
})

app.delete('/menu/:id', async (req, res) => {
    var id = req.params.id;
    try {
        const query = 'DELETE FROM menu_restaurante WHERE id = ?';
        const [result] = await db.query(query, [id]);
        res.status(201).json({
            mensaje: 'Plato eliminado con éxito'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }

})