'use strict';

const { UnauthorizedError } = require('../expressError');
const db = require('../db.js');
const User = require('./users.js');
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require('./_testSeed');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */
describe('authenticate', function() {
	test('works', async function() {
		const user = await User.authenticate('u1', 'password1');
		expect(user).toEqual({
			username: 'u1',
			firstName: 'U1F',
			lastName: 'U1L',
			email: 'u1@email.com'
		});
	});

	test('unauth if no such user', async function() {
		try {
			await User.authenticate('nope', 'password');
			fail();
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		}
	});

	test('unauth if wrong password', async function() {
		try {
			await User.authenticate('u1', 'wrong');
			fail();
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		}
	});
});

/************************************** register */
