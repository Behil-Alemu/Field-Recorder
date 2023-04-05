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

describe('POST /folders/add', function() {
	let newFolder = {
		folderName: 'doggo',
		username: 'u1'
	};

	test('works', async function() {
		const resp = await request(app).post('/folders/add').send(newFolder).set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(201);

		expect(resp.body).toEqual({
			newFolder: {
				folderName: 'doggo',
				id: expect.any(Number),
				username: 'u1'
			}
		});
	});

	test('bad request with missing data', async function() {
		const resp = await request(app)
			.post('/folders/add')
			.send({
				commonName: 'ant'
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(400);
	});

	test('bad request with invalid data', async function() {
		const resp = await request(app)
			.post('/folders/add')
			.send({
				...newFolder,
				logoUrl: 'not-a-url'
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(400);
	});
});
/************************************** GET /folders */
describe('GET /folders', function() {
	test('ok for get all samples', async function() {
		const resp = await request(app).get('/folders/u1').set('authorization', `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			folders: [
				{
					foldername: 'My First Project',
					id: expect.any(Number)
				},
				{
					foldername: 'My third Project',
					id: expect.any(Number)
				}
			]
		});
	});
});

// /************************************** GET /sample-entry/:sample_id */

describe('PATCH /folders/:id', () => {
	test('works', async function() {
		const resp = await request(app)
			.patch(`/folders/2`)
			.send({
				folderName: 'New'
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			editedFolder: {
				folderName: 'New',
				id: expect.any(Number)
			}
		});
	});

	test('unauth if not same user', async function() {
		const resp = await request(app)
			.patch(`/folders/1`)
			.send({
				firstName: 'New'
			})
			.set('authorization', `Bearer ${'none'}`);
		expect(resp.statusCode).toEqual(401);
	});

	test('unauth for anon', async function() {
		const resp = await request(app).patch(`/folders/1`).send({
			commonName: 'New'
		});
		expect(resp.statusCode).toEqual(401);
	});

	test('not found if no such folder', async function() {
		const resp = await request(app)
			.patch(`/folders/nope`)
			.send({
				commonName: 'Nope'
			})
			.set('authorization', `Bearer ${u2Token}`);
		expect(resp.statusCode).toEqual(400);
	});
});

// /************************************** DELETE /companies/:handle */

describe('DELETE /folders/:id', function() {
	test('works for user', async function() {
		const resp = await request(app).delete(`/folders/2`).set('authorization', `Bearer ${u2Token}`);
		expect(resp.body).toEqual({ deleted: '2' });
	});

	test('works for user', async function() {
		const resp = await request(app).delete(`/folders/2`).set('authorization', `Bearer ${'none'}`);
		expect(resp.statusCode).toEqual(401);
	});

	test('unauth for anon', async function() {
		const resp = await request(app).delete(`/folders/2`);
		expect(resp.statusCode).toEqual(401);
	});

	test('not found for no such folder', async function() {
		const resp = await request(app).delete(`/folders/nope`).set('authorization', `Bearer ${u2Token}`);
		expect(resp.statusCode).toEqual(500);
	});
});
