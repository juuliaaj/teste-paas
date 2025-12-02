require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('OK'));

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

app.get('/items', async (req, res) => {
  const { rows } = await pool.query('SELECT id, name FROM items');
  res.json(rows);
});

app.post('/items', async (req, res) => {
  const { name } = req.body;
  const { rows } = await pool.query('INSERT INTO items(name) VALUES($1) RETURNING id, name', [name]);
  res.status(201).json(rows[0]);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port}`));
