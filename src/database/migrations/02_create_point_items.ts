import Knex from 'knex';

export async function up(knex : Knex) {
    return  knex.schema.createTable('point_items', table => {
                table.increments('id').primary();
                table.integer('point_id')
                    .notNullable()
                    .references('id')
                    .inTable('points');//esse comando garante que cada point_id é um id válido na tabela points
                table.integer('item_id')
                    .notNullable()
                    .references('id')
                    .inTable('items');
                
            });
}
export async function down(knex : Knex) {
    return knex.schema.dropTable('point_items');
}