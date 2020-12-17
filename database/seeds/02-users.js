
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email:'test@test.com', password: 'test', first_name: 'Testy', last_name: 'Tester', role_id: '2'},
        {email:'janedoe@test.com', password: 'test', first_name: 'Jane', last_name: 'Doe', role_id: '1'},
        {email:'jamboo@test.com', password: 'test', first_name: 'Jam', last_name: 'Boo', role_id: '2'},
      ]);
    });
};
