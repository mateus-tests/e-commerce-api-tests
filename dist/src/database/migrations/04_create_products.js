"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('products', table => {
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
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('products');
}
exports.down = down;
