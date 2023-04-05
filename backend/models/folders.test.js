'use strict';

const { NotFoundError, BadRequestError } = require('../expressError');
const db = require('../db.js');
const Folder = require('./folders.js');
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require('./_testSeed');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe('add new folder', function() {
	let newFolder = {
		folderName: 'snake',
		username: 'u2'
	};
	test('works', async function() {
		let folder = await Folder.add(newFolder);

		expect(folder).toEqual({
			id: expect.any(Number),
			...newFolder
		});
		const result = await db.query(
			`SELECT folder_name, username
             FROM sample_folder
             WHERE folder_name = 'snake'`
		);
		expect(result.rows).toEqual([
			{
				folder_name: 'snake',
				username: 'u2'
			}
		]);
	});

	test('bad request with dupe', async function() {
		try {
			await Folder.add(newFolder);
			await Folder.add(newFolder);
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});
/************************************** getAllFolder */
describe('findAll', function() {
	test('works: all', async function() {
		let folders = await Folder.getAllFolder('u2');

		expect(folders).toEqual([ { id: 2, foldername: 'My Second Project' } ]);
	});
	test('bad request ', async function() {
		try {
			await Folder.getAllFolder('nope');
			fail();
		} catch (err) {
			expect(err instanceof ReferenceError).toBeTruthy();
		}
	});
});

/************************************** update */
describe('update', function() {
	const updateData = {
		folderName: 'NewFolder'
	};

	test('works', async function() {
		let folder = await Folder.update(1, updateData);
		expect(folder).toEqual({
			id: 1,
			folderName: 'NewFolder'
		});

		const result = await db.query(
			`SELECT folder_name, username
            FROM sample_folder
            WHERE id = 1`
		);

		expect(result.rows).toEqual([ { folder_name: 'NewFolder', username: 'u1' } ]);
	});

	test('not found if no such folder', async function() {
		try {
			await Folder.update(99, updateData);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});

	test('bad request with no data', async function() {
		try {
			await Folder.update(2, {});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** remove */

describe('remove', function() {
	test('works', async function() {
		await Folder.remove(3);
		const res = await db.query('SELECT folder_name FROM sample_folder WHERE id=3');
		expect(res.rows.length).toEqual(0);
	});

	test('not found if no such company', async function() {
		try {
			await Folder.remove(3);
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
