
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
          role_id: '2', 
          shop_id: '1', 
          location_id: '1'
        },
        {
          email:'janedoe@test.com',
          password: 'test', 
          first_name: 'Jane', 
          last_name: 'Doe', 
          role_id: '2', 
          shop_id: '2', 
          location_id: '2'
        },
        {
          email:'jamboo@test.com', 
          password: 'test', 
          first_name: 'Jam', 
          last_name: 'Boo', 
          role_id: '2', 
          shop_id: '3',
          location_id: '3'},
      ]);
    });
};
