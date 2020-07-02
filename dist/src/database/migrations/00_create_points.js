"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('points');
}
exports.down = down;
