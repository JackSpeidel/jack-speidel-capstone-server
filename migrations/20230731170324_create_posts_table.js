exports.up = function (knex) {
    return knex.schema.createTable('posts', (table) => {
        table.increments('id').primary();
        table.string("title").notNullable();
        table.string("content", 1000).notNullable();
        table.integer("likes").notNullable().defaultTo(0);
        table
            .integer('user_id').notNullable()
            .unsigned()
            .references('users.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
