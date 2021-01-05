
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email:'test@test.com', 
          password: 'test', 
          first_name: 'Testy', 
          last_name: 'Tester',
          shop_name: 'Zesty Testy\'s Spices',
          role_id: '2',
          location_id: '1'
        },
        {
          email:'janedoe@test.com',
          password: 'test', 
          first_name: 'Jane', 
          last_name: 'Doe', 
          shop_name: 'Jane Two Exports',
          role_id: '2', 
          location_id: '2'
        },
        {
          email:'jamboo@test.com', 
          password: 'test', 
          first_name: 'Jam', 
          last_name: 'Boo',
          shop_name: 'Jamboo Jams',
          role_id: '2', 
          location_id: '3'
        },
      ]);
    });
};
