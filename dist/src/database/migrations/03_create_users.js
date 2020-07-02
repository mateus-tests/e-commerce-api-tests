"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('userName').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable().unique();
        table.string('profile_picture').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('users');
}
exports.down = down;
