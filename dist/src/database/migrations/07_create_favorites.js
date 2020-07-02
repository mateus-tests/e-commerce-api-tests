"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('favorites', table => {
        table.increments('id').primary();
        table.integer('product_id')
            .notNullable()
            .references('id')
            .inTable('products'); //esse comando garante que cada point_id é um id válido na tabela points
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('favorites');
}
exports.down = down;
