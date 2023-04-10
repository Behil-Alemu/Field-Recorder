'use strict';

const request = require('supertest');

const db = require('../db.js');
const app = require('../app.cjs');
const User = require('../models/users.cjs');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testFolderIds,
	u1Token,
	u2Token,
	testSampleIds
} = require('./_testCommon');
const { token } = require('morgan');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /users/:username */

describe('GET /users/:username', function() {
	test('works', async function() {
		const resp = await request(app).get(`/users/u1`).set('authorization', `Bearer ${u2Token}`);
		expect(resp.body).toEqual({
			user: {
				username: 'u1',
				firstName: 'U1F',
				lastName: 'U1L',
				email: 'user1@user.com'
			}
		});
	});

	test('unauth for other users', async function() {
		const resp = await request(app).get(`/users/u1`).set('authorization', `Bearer ${'none'}`);
		expect(resp.statusCode).toEqual(401);
	});

	test('unauth for anon', async function() {
		const resp = await request(app).get(`/users/u1`);
		expect(resp.statusCode).toEqual(401);
	});

	test('not found if user not found', async function() {
		const resp = await request(app).get(`/users/nope`).set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(404);
	});
});

/************************************** PATCH /users/:username */

describe('PATCH /users/:username', () => {
	test('works', async function() {
		const resp = await request(app)
			.patch(`/users/u1`)
			.send({
				firstName: 'New'
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			user: {
				username: 'u1',
				firstName: 'New',
				lastName: 'U1L',
				email: 'user1@user.com'
			}
		});
	});

	test('unauth if not same user', async function() {
		const resp = await request(app)
			.patch(`/users/u1`)
			.send({
				firstName: 'New'
			})
			.set('authorization', `Bearer ${'none'}`);
		expect(resp.statusCode).toEqual(401);
	});

	test('unauth for anon', async function() {
		const resp = await request(app).patch(`/users/u1`).send({
			firstName: 'New'
		});
		expect(resp.statusCode).toEqual(401);
	});

	test('not found if no such user', async function() {
		const resp = await request(app)
			.patch(`/users/nope`)
			.send({
				firstName: 'Nope'
			})
			.set('authorization', `Bearer ${u2Token}`);
		expect(resp.statusCode).toEqual(404);
	});

	test('bad request if invalid data', async function() {
		const resp = await request(app)
			.patch(`/users/u1`)
			.send({
				firstName: 42
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(400);
	});

	test('works: can set new password', async function() {
		const resp = await request(app)
			.patch(`/users/u1`)
			.send({
				password: 'new-password'
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			user: {
				username: 'u1',
				firstName: 'U1F',
				lastName: 'U1L',
				email: 'user1@user.com'
			}
		});
		const isSuccessful = await User.authenticate('u1', 'new-password');
		expect(isSuccessful).toBeTruthy();
	});
});

/************************************** DELETE /users/:username */

describe('DELETE /users/:username', function() {
	test('unauth for anon', async function() {
		const resp = await request(app).delete(`/users/u2`);
		expect(resp.statusCode).toEqual(401);
	});

	test('not found if user missing', async function() {
		const resp = await request(app).delete(`/users/nope`).set('authorization', `Bearer ${u2Token}`);
		expect(resp.statusCode).toEqual(404);
	});
});
