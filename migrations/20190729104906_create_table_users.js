exports.up = function(knex) {
  return knex.schema.createTable("users", usersTable => {
    usersTable.increments("id").primary();
    usersTable.string("name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
