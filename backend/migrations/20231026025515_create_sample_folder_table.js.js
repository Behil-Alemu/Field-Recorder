exports.up = function(knex) {
	return knex.schema.createTable('sample_folder', function(table) {
		table.increments('id').primary();
		table.text('folder_name').notNullable();
		table.string('username').notNullable();
		table.foreign('username').references('users.username').onDelete('CASCADE');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('sample_folder');
};
