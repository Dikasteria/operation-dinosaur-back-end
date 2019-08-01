exports.up = function(knex) {
  return knex.schema.createTable('devices', devicesTable => {
    devicesTable.increments('id').primary();
    devicesTable
      .integer('user_id')
      .references('users.id')
      .notNullable();
    devicesTable.string('push_key');
    devicesTable.string('amazon_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('devices');
};
