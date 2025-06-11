const express = require('express');
const db = require('./db');
require('dotenv').config();

const path = require('path');

// Serve frontend HTML


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../frontend')));
// Get all notes
app.get('/notes', (req, res) => { 
  db.query('SELECT * FROM notes', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a new note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  db.query('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, title, content });
  });
});

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM notes WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting note:', err);
            res.status(500).json({ error: 'Error deleting note' });
            return;
        }
        res.json({ message: 'Note deleted successfully' });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
