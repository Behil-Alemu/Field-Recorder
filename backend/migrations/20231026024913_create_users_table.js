exports.up = function(knex) {
	return knex.schema.createTable('users', function(table) {
		table.string('username').primary();
		table.text('password');
		table.text('first_name').notNullable();
		table.text('last_name').notNullable();
		table.text('email').notNullable().check(knex.raw("position('@' IN email) > 1"));
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('users');
};
