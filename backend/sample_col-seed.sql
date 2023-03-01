INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('First',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'First',
        'User',
        'firstuser@yahoo.com'),
        ('Second',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Second',
        'User',
        'Seconduser@yahoo.com');

        
INSERT INTO sample_folder (id, folder_name, username)
    VALUES 
        (1,'My First Project', 'First'),
        (2,'My Second Project', 'Second');


INSERT INTO sample_entry (sample_id, common_name, scientific_name, quantity, location, image_url, note, timestamp, username, folder_id)
VALUES (1, 
        'oak tree', 
        'Quercus',
         5,
        '41.4034° N, 2.1741° E', 
        'oak.png', 
        'Est 20 ft tall', 
        '2023-01-04 13:10:00', 
        'Second',
        2),
        (2, 
        'pine tree', 
        'genus Pinus', 
        3, 
        '41.4934° N, 8.1741° E', 
        'pine.png', 
        'None',
        '2023-01-04 13:30:00', 
        'Second',
        2),
        (3, 
        'Tulip', 
        'Tulipa', 
        10, 
        '40.7128° N, 74.0060° W', 
        'tulip.png', 
        'Red and yellow colors', 
        '2023-01-05 09:30:00', 
        'First',
        1),
        (4, 
        'Rose', 
        'Rosa', 
        3, 
        '51.5074° N, 0.1278° W', 
        'rose.jpg', 
        'Fragrant smell', 
        '2023-01-05 15:45:00', 
        'First',
        1);



