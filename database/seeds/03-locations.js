
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('locations').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {location: 'KEN'},
        {location: 'TZA'},
        {location: 'RWA'},
        {location: 'UGA'}
      ]);
    });
};
