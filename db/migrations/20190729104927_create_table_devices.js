exports.up = function(knex) {
  return knex.schema.createTable("devices", devicesTable => {
    devicesTable.increments("id").primary();
    devicesTable
      .integer("user_id")
      .references("users.id")
      .notNullable();
    devicesTable.string("push_key").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("devices");
};
