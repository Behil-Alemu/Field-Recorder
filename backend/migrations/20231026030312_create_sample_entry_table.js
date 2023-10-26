exports.up = function(knex) {
	return knex.schema.createTable('sample_entry', function(table) {
		table.increments('sample_id').primary();
		table.text('common_name').notNullable();
		table.text('scientific_name').notNullable();
		table.integer('quantity').defaultTo(1);
		table.text('location').notNullable();
		table.text('image_url');
		table.text('note').defaultTo('None');
		table.timestamp('timestamp').defaultTo(knex.fn.now()).notNullable();
		table.string('username').notNullable();
		table.integer('folder_id').notNullable();
		table.foreign('username').references('users.username').onDelete('CASCADE');
		table.foreign('folder_id').references('sample_folder.id').onDelete('CASCADE');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('sample_entry');
};
