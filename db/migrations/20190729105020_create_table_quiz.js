exports.up = function(knex) {
  return knex.schema.createTable("quiz", quizTable => {
    quizTable.increments("id").primary();
    quizTable
      .integer("user_id")
      .references("users.id")
      .notNullable();
    quizTable.timestamp("due").notNullable();
    quizTable.boolean("completed").defaultTo(false);
    quizTable.timestamp("completed_at");
    quizTable.integer("status").defaultTo(0);
    quizTable.integer("mood").defaultTo(0);
    quizTable.integer("stiffness").defaultTo(0);
    quizTable.integer("slowness").defaultTo(0);
    quizTable.integer("tremor").defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("quiz");
};
