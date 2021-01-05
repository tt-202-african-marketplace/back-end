
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {category_name: 'animal products'}, //1
        {category_name: 'cereals'}, //2
        {category_name: 'clothing and shoes'}, //3
        {category_name: 'cosmetics'}, //4
        {category_name: 'fruits'}, //5
        {category_name: 'seeds and nuts'}, //6
        {category_name: 'vegetables'}, //7
        {category_name: 'other'}, //8
      ]);
    });
};
