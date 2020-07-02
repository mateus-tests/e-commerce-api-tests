import Knex from 'knex';

export async function up(knex : Knex) {
    return  knex.schema.createTable('categories', table => {
                table.increments('id').primary();
                table.string('title').notNullable();
                table.string('category_image_url').notNullable();
                table.string('image_offers_url').notNullable();
    });
}
export async function down(knex : Knex) {
    return knex.schema.dropTable('categories');
}