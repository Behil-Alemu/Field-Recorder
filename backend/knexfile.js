module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './dev.sqlite3'
		}
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'sample_col',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './migrations'
		},
		seeds: {
			directory: './seed'
		}
	}
};
