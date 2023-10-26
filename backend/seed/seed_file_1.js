exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('sample_entry')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('sample_entry').insert([
          {
            sample_id: 1,
            common_name: 'oak tree',
            scientific_name: 'Quercus',
            quantity: 5,
            location: '41.4034° N, 2.1741° E',
            image_url: 'oak.png',
            note: 'Est 20 ft tall',
            timestamp: '2023-01-04 13:10:00',
            username: 'Second',
            folder_id: 267947686382,
          },
          {
            sample_id: 2,
            common_name: 'pine tree',
            scientific_name: 'genus Pinus',
            quantity: 3,
            location: '41.4934° N, 8.1741° E',
            image_url: 'pine.png',
            note: 'None',
            timestamp: '2023-01-04 13:30:00',
            username: 'Second',
            folder_id: 267947686382,
          },
          {
            sample_id: 3,
            common_name: 'Tulip',
            scientific_name: 'Tulipa',
            quantity: 10,
            location: '40.7128° N, 74.0060° W',
            image_url: 'tulip.png',
            note: 'Red and yellow colors',
            timestamp: '2023-01-05 09:30:00',
            username: 'First',
            folder_id: 186538652965,
          },
          {
            sample_id: 4,
            common_name: 'Rose',
            scientific_name: 'Rosa',
            quantity: 3,
            location: '51.5074° N, 0.1278° W',
            image_url: 'rose.jpg',
            note: 'Fragrant smell',
            timestamp: '2023-01-05 15:45:00',
            username: 'First',
            folder_id: 186538652965,
          },
        ]);
      });
  };
  