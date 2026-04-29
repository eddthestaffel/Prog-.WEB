const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '10.32.0.78',
  user: 'root',
  password: 'admin',
  database: 'fih'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado con el ID: ' + connection.threadId);
});

module.exports = connection;
