exports.up = function (knex) {
  return knex.schema.createTable('todos', function (table) {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.text('description');
    table.boolean('completed').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('todos');
};