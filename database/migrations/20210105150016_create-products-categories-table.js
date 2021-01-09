
exports.up = function(knex) {
    return knex.schema
      .createTable('categories', tbl => {
          tbl.increments();
          tbl.string('category_name', 128).unique().notNullable();
      })
      .createTable('products', tbl => {
          tbl.increments();
          tbl.integer('item_name').notNullable();
          tbl.integer('user_id').notNullable().references('users.id');
          tbl.integer('category_id').notNullable().references('categories.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
          tbl.string('price', 128).notNullable();
          tbl.string('description', 255);

      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('products')
      .dropTableIfExists('categories');
  };
  