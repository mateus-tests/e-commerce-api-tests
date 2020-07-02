import { Request, Response } from 'express';

import knex from '../database/connection';
import Utils from '../utils/Utils';

const utils = new Utils();


export default class UsersServices {
    /*Users listll*/
    users = [
        'Mateus',
        'Henrique',
        'Supimpa',
        'Legal',
        'Tunel',
        'carrosel',
        'textel'
    ];
    
    async index ({ request, response }: { request: Request; response: Response; }) {
        const retrieveUsers = await knex('users')
                                        .select('*');
        return response.json(retrieveUsers);
        
        /*const { search } = request.query;
        response.json( search === undefined ? 
            this.users : 
            this.users.filter(user => {
                return user.toUpperCase().includes(search.toString().toUpperCase());
        }));*/
    }
    show ({request, response} : { request : Request; response : Response}){
        const { id } = request.params;
        return this.users[Number(id)] ?
            response.json({user : this.users[Number(id)]}) :
            response.status(404).send('Not Found');        
    }
    async store ({ request, response } : { request : Request, response : Response }){
        const { email, password, userName } = request.body;
        const profile_picture = 'http://localhost:3333/uploads/avatarDefault.svg';
        const userExists = await knex('users')
                                    .where('email', email)
                                    .first();
        
        if(!userExists){
            const user = {
                email,
                password : utils.passwordEncrypt(password),
                userName,
                profile_picture
            }
            let insertedIds = await knex('users').insert(user);
            console.log(insertedIds);
            return response.json(user);
        }
        return response.status(409).send();
        
    }
    async destroy ({request, response} : {request : Request, response : Response}){
        const { user_id } = request.params;
        
        const user = await knex('users').where('id', user_id).first();

        if(!user){
            return response.status(404).send();
        }

        await knex('users')
                .where('id', user_id)
                .del();
        return response.json(user);
    }
}