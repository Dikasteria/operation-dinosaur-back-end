exports.up = function(knex) {
  return knex.schema.createTable('codes', codesTable => {
    codesTable.increments('id').primary();
    codesTable
      .integer('user_id')
      .references('users.id')
      .notNullable();
    codesTable.text('code').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('codes');
};
