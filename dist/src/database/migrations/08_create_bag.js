"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('bags', table => {
        table.increments('id').primary();
        table.integer('product_id')
            .notNullable()
            .references('id')
            .inTable('products'); //esse comando garante que cada point_id é um id válido na tabela points
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users');
        table.integer('categorie_id')
            .notNullable()
            .references('id')
            .inTable('categories');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('bags');
}
exports.down = down;
