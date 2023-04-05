'use strict';

const { NotFoundError, BadRequestError } = require('../expressError');
const db = require('../db.js');
const Sample = require('./sample-entry.js');
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require('./_testSeed');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe('add sample', function() {
	let newSample = {
		commonName: 'ant',
		scientificName: 'scientificAnt',
		quantity: 2,
		location: '41.4934° N, 8.1741° E',
		imageUrl: 'image.png',
		note: 'note it up',
		username: 'u1',
		folderId: 2
	};

	test('works', async function() {
		let sample = await Sample.add(newSample);
		expect(sample).toEqual({
			commonName: 'ant',
			scientificName: 'scientificAnt',
			quantity: 2,
			location: '41.4934° N, 8.1741° E',
			imageUrl: 'image.png',
			note: 'note it up',
			sample_id: expect.any(Number)
		});
	});
});
/************************************** findAll */

describe('getAllSample', function() {
	test('works: no filter', async function() {
		let samples = await Sample.getAllSample('u1', 'My First Project');

		expect(samples).toEqual([ ...samples ]);
	});
});

/************************************** getSampleById(sampleId) {
 */

describe('get', function() {
	test('works', async function() {
		let sample = await Sample.getSampleById('1');

		expect(sample).toEqual({
			common_name: 'oak tree',
			folder_id: 2,
			image_url: 'oak.png',
			location: '41.4034° N, 2.1741° E',
			note: 'Est 20 ft tall',
			quantity: 5,
			sample_id: 1,
			timestamp: sample.timestamp,
			scientific_name: 'Quercus',
			username: 'u2'
		});
	});

	test('not found if no such job', async function() {
		try {
			await Sample.getSampleById(0);
			fail();
		} catch (err) {
			console.log(err);

			expect(err instanceof ReferenceError).toBeTruthy();
		}
	});
});

/************************************** update */
describe('update', function() {
	let updateData = {
		commonName: 'Tulip',
		scientificName: 'Tulip',
		quantity: 9
	};
	test('works', async function() {
		let sample = await Sample.update('1', updateData);
		expect(sample).toEqual({
			...updateData,
			imageUrl: 'oak.png',
			location: '41.4034° N, 2.1741° E',
			note: 'Est 20 ft tall',
			sample_id: 1
		});
	});
	test('not found if no such job', async function() {
		try {
			await Sample.update(0, {
				commonName: 'test'
			});
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});

	test('bad request with no data', async function() {
		try {
			await Sample.update('1', {});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** remove */

describe('remove', function() {
	test('works', async function() {
		await Sample.remove('1');
		const res = await db.query('SELECT sample_id FROM sample_entry WHERE sample_id=$1', [ '1' ]);
		expect(res.rows.length).toEqual(0);
	});

	test('not found if no such job', async function() {
		try {
			await Sample.remove(0);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
