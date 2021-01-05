
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('shops').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('shops').insert([
        {shop_name: 'Zesty Testy'},
        {shop_name: 'Jane Two Exports'},
        {shop_name: 'Booberry Jams'}
      ]);
    });
};
