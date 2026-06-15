require('dotenv').config();
const express = require('express');
const db = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Todo TDD API is running' });
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await db('todos').select('*').orderBy('id');
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await db('todos').where({ id: req.params.id }).first();
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const [todo] = await db('todos')
      .insert({ title, description })
      .returning('*');
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const [todo] = await db('todos')
      .where({ id: req.params.id })
      .update({ title, description, completed, updated_at: db.fn.now() })
      .returning('*');
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const deleted = await db('todos').where({ id: req.params.id }).del();
    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;