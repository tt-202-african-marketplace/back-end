
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          item_name: 'test item', 
          category_id: 4, 
          user_id: 1,
          price: '6.99',
          description: 'looks good!'
        },
        {
          item_name: 'dummy product', 
          category_id: 3, 
          user_id: 2,
          price: '3.00',
          description: 'comfortable!'
        },
        {
          item_name: 'what is this', 
          category_id: 8, 
          user_id: 2,
          price: '0.01',
        },

      ]);
    });
};
