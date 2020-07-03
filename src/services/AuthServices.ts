import { Request, Response } from 'express';

import knex from '../database/connection';

import Utils from '../utils/Utils';

const utils = new Utils();

import jwt from 'jsonwebtoken';

//import '../../config/getEnv';

type User = {
    id : number;
    userName : string;
    password : string;
    email : string;
    profile_picture : string;
}

export default class AuthServices{
    async authenticate({request, response} : {request : Request, response : Response}){
        const { email, password, authenticate_social_mobile } = request.body;
        
        const user = await knex('users')
                                .where('email', email)
                                .first();
        if(!user) {
            return response.status(401).send();
        }
        if( String(authenticate_social_mobile).toUpperCase() === "FALSE"){
            const isValid = await utils.isValidPassword(password, user.password);
            if(!isValid){
                return response.status(401).send();
            }
        }

        const token = jwt.sign( { id : user.id }, String(process.env.APP_SECRET_KEY), { expiresIn : '30d' } );
            
        delete user.password;

        return response.json({
            user,
            token
        });
    }

    socialAuthenticate ({request, response} : {request : Request, response : Response}) {
        const user  = request.user as User;
        
        const token = jwt.sign( { id : user.id }, String(process.env.APP_SECRET_KEY), { expiresIn : '30d' } );

        delete user.password;

        return response.json({
            user,
            token
        });
    }
}