
exports.up = function(knex) {
  return knex.schema
    .createTable('roles', tbl => {
        tbl.increments();
        tbl.string('role', 128).unique().notNullable();
    })
    .createTable('users', tbl => {
        tbl.increments();
        tbl.string('email', 255).notNullable().unique();
        tbl.string('password', 255).notNullable();
        tbl.string('first_name', 128).notNullable();
        tbl.string('last_name', 128).notNullable();
        tbl.integer('role_id').notNullable().references('roles.id')
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('roles');
};
