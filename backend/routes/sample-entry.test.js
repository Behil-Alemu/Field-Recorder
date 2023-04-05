'use strict';

const request = require('supertest');

const app = require('../app');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testJobIds,
	u1Token,
	u2Token,
	testSampleIds
} = require('./_testCommon');
const { token } = require('morgan');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);
/************************************** POST / add a post */

describe('POST /sample-entry/add', function() {
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
		const resp = await request(app)
			.post('/sample-entry/add')
			.send(newSample)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			newSample: {
				commonName: 'ant',
				scientificName: 'scientificAnt',
				quantity: 2,
				location: '41.4934° N, 8.1741° E',
				imageUrl: 'image.png',
				note: 'note it up',
				sample_id: expect.any(Number)
			}
		});
	});

	test('bad request with missing data', async function() {
		const resp = await request(app)
			.post('/sample-entry/add')
			.send({
				commonName: 'ant',
				scientificName: 'scientificAnt'
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(400);
	});

	test('bad request with invalid data', async function() {
		const resp = await request(app)
			.post('/sample-entry/add')
			.send({
				...newSample,
				logoUrl: 'not-a-url'
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(400);
	});
});
/************************************** GET /samples */
describe('GET /samples', function() {
	test('ok for get all samples', async function() {
		const resp = await request(app)
			.get('/sample-entry/u1/My First Project')
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			samples: [
				{
					common_name: 'Tulip',
					scientific_name: 'Tulipa',
					quantity: 10,
					location: '40.7128° N, 74.0060° W',
					image_url: 'tulip.png',
					note: 'Red and yellow colors',
					timestamp: expect.any(String),
					username: 'u1',
					folder_id: 1,
					sample_id: expect.any(Number)
				},
				{
					common_name: 'Rose',
					folder_id: 1,
					image_url: 'rose.jpg',
					location: '51.5074° N, 0.1278° W',
					note: 'Fragrant smell',
					quantity: 3,
					sample_id: 4,
					scientific_name: 'Rosa',
					timestamp: '2023-01-05T20:45:00.000Z',
					username: 'u1'
				}
			]
		});
	});
});

/************************************** GET /sample-entry/:sample_id */

describe('GET /sample-entry/:id', function() {
	test('works get sample', async function() {
		const resp = await request(app).get(`/sample-entry/1`).set('authorization', `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			sample: {
				common_name: 'oak tree',
				folder_id: 2,
				image_url: 'oak.png',
				location: '41.4034° N, 2.1741° E',
				note: 'Est 20 ft tall',
				quantity: 5,
				sample_id: 1,
				scientific_name: 'Quercus',
				timestamp: '2023-01-04T18:10:00.000Z',
				username: 'u2'
			}
		});
	});

	test('not found for no such company', async function() {
		const resp = await request(app).get(`/sample-entry/nope`);
		expect(resp.statusCode).toEqual(401);
	});
});

describe('PATCH /sample-entry/:id', () => {
	test('works', async function() {
		const resp = await request(app)
			.patch(`/sample-entry/2`)
			.send({
				commonName: 'New'
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			editedSample: {
				commonName: 'New',
				imageUrl: 'pine.png',
				location: '41.4934° N, 8.1741° E',
				note: 'None',
				quantity: 3,
				sample_id: 2,
				scientificName: 'genus Pinus'
			}
		});
	});

	test('unauth if not same user', async function() {
		const resp = await request(app)
			.patch(`/sample-entry/1`)
			.send({
				firstName: 'New'
			})
			.set('authorization', `Bearer ${'none'}`);
		expect(resp.statusCode).toEqual(401);
	});

	test('unauth for anon', async function() {
		const resp = await request(app).patch(`/sample-entry/1`).send({
			commonName: 'New'
		});
		expect(resp.statusCode).toEqual(401);
	});

	test('not found if no such sample', async function() {
		const resp = await request(app)
			.patch(`/sample-entry/nope`)
			.send({
				commonName: 'Nope'
			})
			.set('authorization', `Bearer ${u2Token}`);
		expect(resp.statusCode).toEqual(500);
	});
});

/************************************** DELETE /companies/:handle */

describe('DELETE /sample-entry/:sample_id', function() {
	test('works for user', async function() {
		const resp = await request(app).delete(`/sample-entry/2`).set('authorization', `Bearer ${u2Token}`);
		expect(resp.body).toEqual({ deleted: '2' });
	});

	test('works for user', async function() {
		const resp = await request(app).delete(`/sample-entry/2`).set('authorization', `Bearer ${'none'}`);
		expect(resp.statusCode).toEqual(401);
	});

	test('unauth for anon', async function() {
		const resp = await request(app).delete(`/sample-entry/2`);
		expect(resp.statusCode).toEqual(401);
	});

	test('not found for no such sample', async function() {
		const resp = await request(app).delete(`/sample-entry/nope`).set('authorization', `Bearer ${u2Token}`);
		expect(resp.statusCode).toEqual(500);
	});
});
