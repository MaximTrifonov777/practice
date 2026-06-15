exports.seed = async function (knex) {
  await knex('todos').del();

  await knex('todos').insert([
    {
      id: 1,
      title: 'Setup project structure',
      description: 'Create folders and initialize npm project',
      completed: true,
    },
    {
      id: 2,
      title: 'Configure database',
      description: 'Setup knex and PostgreSQL connection',
      completed: false,
    },
    {
      id: 3,
      title: 'Write API endpoints',
      description: 'Create REST routes for CRUD operations',
      completed: false,
    },
  ]);
};