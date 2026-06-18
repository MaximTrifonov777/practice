const db = require('../db/connection');

const todoController = {
  async getAll(req, res, next) {
    try {
      const todos = await db('todos').select('*').orderBy('id');
      res.json(todos);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const todo = await db('todos').where({ id: req.params.id }).first();
      if (!todo) {
        const error = new Error('Todo not found');
        error.statusCode = 404;
        throw error;
      }
      res.json(todo);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { title, description } = req.body;
      if (!title) {
        const error = new Error('Title is required');
        error.statusCode = 400;
        throw error;
      }
      const [todo] = await db('todos')
        .insert({ title, description })
        .returning('*');
      res.status(201).json(todo);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { title, description, completed } = req.body;
      const [todo] = await db('todos')
        .where({ id: req.params.id })
        .update({ title, description, completed, updated_at: db.fn.now() })
        .returning('*');
      if (!todo) {
        const error = new Error('Todo not found');
        error.statusCode = 404;
        throw error;
      }
      res.json(todo);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const deleted = await db('todos').where({ id: req.params.id }).del();
      if (!deleted) {
        const error = new Error('Todo not found');
        error.statusCode = 404;
        throw error;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

module.exports = todoController;