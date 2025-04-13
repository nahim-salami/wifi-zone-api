// config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a MySQL connection pool
console.log( process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME, process.env.DB_PORT)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
