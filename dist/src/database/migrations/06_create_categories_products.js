"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('categories_products', table => {
        table.increments('id').primary();
        table.integer('categorie_id')
            .notNullable()
            .references('id')
            .inTable('categories'); //esse comando garante que cada point_id é um id válido na tabela points
        table.integer('product_id')
            .notNullable()
            .references('id')
            .inTable('products');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('categories_products');
}
exports.down = down;
