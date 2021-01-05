
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          item_name: 'test item', 
          category_id: 3, 
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
          item_name: 'unknown item', 
          category_id: 8, 
          user_id: 1,
          price: '0.01',
        },
        {
          item_name: 'make-up', 
          category_id: 4, 
          user_id: 3,
          price: '5.49',
          description: 'beautiful!'
        },
        {
          item_name: 'cereal item', 
          category_id: 2, 
          user_id: 2,
          price: '3.00',
          description: 'not cap\'n crunch!?'
        },
        {
          item_name: 'seeds and nuts', 
          category_id: 6, 
          user_id: 2,
          price: '0.01',
        },
        {
          item_name: 'turnip', 
          category_id: 7, 
          user_id: 3,
          price: '5.49',
          description: 'good for soups!'
        },
        {
          item_name: 'tamarind', 
          category_id: 5, 
          user_id: 1,
          price: '3.00',
          description: 'looks funny!'
        },
        {
          item_name: 'moo moo milk', 
          category_id: 1, 
          user_id: 3,
          price: '2.49',
        },
        {
          item_name: 'what is this?', 
          category_id: 8, 
          user_id: 3,
          price: '0.01',
          description: 'no really what is this'
        },

      ]);
    });
};
