import Knex from 'knex';

export async function up(knex : Knex) {
    return  knex.schema.createTable('orders', table => {
                table.increments('id').primary();
                table.integer('product_id')
                    .notNullable()
                    .references('id')
                    .inTable('products');//esse comando garante que cada point_id é um id válido na tabela points
                table.integer('user_id')
                    .notNullable()
                    .references('id')
                    .inTable('users');
                table.string('status').notNullable();
            });
}
export async function down(knex : Knex) {
    return knex.schema.dropTable('orders');
}