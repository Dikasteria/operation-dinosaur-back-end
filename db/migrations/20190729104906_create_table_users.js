exports.up = function(knex) {
  return knex.schema.createTable("users", usersTable => {
    usersTable.increments("id").primary();
    usersTable.string("first_name").notNullable();
    usersTable.string("surname").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
