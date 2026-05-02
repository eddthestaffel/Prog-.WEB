const mysql = require('mysql2/promise');
const connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Stomas.2024',
  database: 'usuario',
  port: 3306
});

module.exports = connection;