exports.up = (knex) => {
    return knex.schema.createTable('comments', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('CASCADE');
        table.integer('points_id').unsigned().index().references('id').inTable('points').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string('title').notNullable();
        table.text('comment');
        table.integer('rating').notNullable();
    });
}

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('comments');
}