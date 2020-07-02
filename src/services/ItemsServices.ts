import { Request, Response } from 'express';

import knex from '../database/connection';

export default class ItemsServices{
    async index ({ request, response } : {request : Request, response : Response}){
        const items = await knex('items').select('*');
        const serializedItems = items.map( item => {
            const { id ,image, title } = item;
            return {
                id,
                title,
                image_url : `http://localhost:3333/uploads/${image}`
            }
        });
        response.json(serializedItems);//
    }
}