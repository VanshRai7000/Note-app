const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vansh56789p",
  database: "notesdb"  
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
