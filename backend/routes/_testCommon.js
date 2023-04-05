'use strict';

const db = require('../db.js');
const Folders = require('../models/folders');
const Sample = require('../models/sample-entry');
const User = require('../models/users');
const { createToken } = require('../helpers/tokens');

const testSampleIds = [];
const testFolderIds = [];

async function commonBeforeAll() {
	// noinspection SqlWithoutWhere
	await db.query('DELETE FROM sample_entry');
	// noinspection SqlWithoutWhere
	await db.query('DELETE FROM sample_folder');
	await db.query('DELETE FROM users');

	await User.register({
		username: 'u1',
		firstName: 'U1F',
		lastName: 'U1L',
		email: 'user1@user.com',
		password: 'password1'
	});
	await User.register({
		username: 'u2',
		firstName: 'U2F',
		lastName: 'U2L',
		email: 'user2@user.com',
		password: 'password2'
	});
	await User.register({
		username: 'u3',
		firstName: 'U3F',
		lastName: 'U3L',
		email: 'user3@user.com',
		password: 'password3'
	});

	await db.query(
		`
        INSERT INTO sample_folder (id, folder_name, username)
    VALUES 
        (1,'My First Project', 'u1'),
        (2,'My Second Project', 'u2'),
        (3,'My third Project', 'u1')`
	);

	await db.query(`
    INSERT INTO sample_entry(sample_id, common_name, scientific_name, quantity, location, image_url, note, timestamp, username, folder_id)
    VALUES (1, 
        'oak tree', 
        'Quercus',
         5,
        '41.4034° N, 2.1741° E', 
        'oak.png', 
        'Est 20 ft tall', 
        '2023-01-04 13:10:00', 
        'u2',
        2),
        (2, 
        'pine tree', 
        'genus Pinus', 
        3, 
        '41.4934° N, 8.1741° E', 
        'pine.png', 
        'None',
        '2023-01-04 13:30:00', 
        'u2',
        2),
        (3, 
        'Tulip', 
        'Tulipa', 
        10, 
        '40.7128° N, 74.0060° W', 
        'tulip.png', 
        'Red and yellow colors', 
        '2023-1-5 9:30:00', 
        'u1',
        1),
        (4, 
        'Rose', 
        'Rosa', 
        3, 
        '51.5074° N, 0.1278° W', 
        'rose.jpg', 
        'Fragrant smell', 
        '2023-1-5 15:45:00', 
        'u1',
        1)`);
}

async function commonBeforeEach() {
	await db.query('BEGIN');
}

async function commonAfterEach() {
	await db.query('ROLLBACK');
}

async function commonAfterAll() {
	await db.end();
}

const u1Token = createToken({ username: 'u1' });
const u2Token = createToken({ username: 'u2' });

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testSampleIds,
	u1Token,
	u2Token,
	testFolderIds
};
