exports.up = function(knex) {
  return knex.schema.createTable('codes', codesTable => {
    codesTable.increments('id').primary();
    codesTable.text('code').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('codes');
};
