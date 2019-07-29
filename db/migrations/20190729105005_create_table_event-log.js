exports.up = function(knex) {
  return knex.schema.createTable("events", eventsTable => {
    eventsTable.increments("id").primary();
    eventsTable
      .integer("user_id")
      .references("users.id")
      .notNullable();
    eventsTable.timestamp("time").defaultTo(knex.fn.now());
    eventsTable.text("description").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("events");
};
