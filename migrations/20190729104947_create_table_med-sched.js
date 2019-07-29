exports.up = function(knex) {
  return knex.schema.createTable("meds", medsTable => {
    medsTable.increments("id").primary();
    medsTable
      .integer("user_id")
      .references("users.id")
      .notNullable();
    medsTable.string("type").notNullable();
    medsTable.timestamp("due").notNullable();
    medsTable
      .boolean("taken")
      .notNullable()
      .defaultTo(false);
    medsTable.timestamp("taken_at");
    medsTable
      .integer("status")
      .defaultTo(0)
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("meds");
};
