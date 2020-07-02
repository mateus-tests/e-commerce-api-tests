import Knex from 'knex';

export async function up(knex : Knex) {
    return  knex.schema.createTable('favorites', table => {
                table.increments('id').primary();
                table.integer('product_id')
                    .notNullable()
                    .references('id')
                    .inTable('products');//esse comando garante que cada point_id é um id válido na tabela points
                table.integer('user_id')
                    .notNullable()
                    .references('id')
                    .inTable('users');
            });
}
export async function down(knex : Knex) {
    return knex.schema.dropTable('favorites');
}