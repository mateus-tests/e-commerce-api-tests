import knex from 'knex';


const connection = knex({
    client : 'pg',
    connection : process.env.DATABASE_URL,
    useNullAsDefault : true
});

export default connection;