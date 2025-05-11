CREATE DATABASE IF NOT EXISTS notesdb;

USE notesdb;
-- added comments to the SQL file
-- This SQL file creates a database and a table for storing notes
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM notes

TRUNCATE TABLE notes;
