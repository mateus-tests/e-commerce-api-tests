
import knex from '../database/connection';

import { Request, Response } from 'express';

export default class ProfileServices{
    async profile({request, response} : {request : Request, response : Response}) {
        
        const user = await knex('users')
                                .where('id', request.userId)
                                .first();
        return response.json(user);
    }
}

