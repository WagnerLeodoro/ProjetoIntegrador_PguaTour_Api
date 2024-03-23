exports.up = (knex) => {
    return knex.schema.createTable('images', (table) => {
        table.increments('id').primary();
        table.integer("points_id").unsigned().index().references('id').inTable('points').onDelete('CASCADE');
        table.string('link_image');
    });
}

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('images');
}