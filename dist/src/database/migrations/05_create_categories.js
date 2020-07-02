"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('category_image_url').notNullable();
        table.string('image_offers_url').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('categories');
}
exports.down = down;
