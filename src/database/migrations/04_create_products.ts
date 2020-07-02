import Knex from 'knex';

export async function up(knex : Knex) {
    return  knex.schema.createTable('products', table => {
                table.increments('id').primary();
                table.string('title').notNullable();
                table.string('main_image_url').notNullable();
                table.string('images_url').notNullable();
                table.integer('assessments').notNullable();
                table.float('price').notNullable();
                table.string('technical_informations').notNullable();
                table.string('plots').notNullable();
                table.string('payment_methods').notNullable();
    });
}
export async function down(knex : Knex) {
    return knex.schema.dropTable('products');
}