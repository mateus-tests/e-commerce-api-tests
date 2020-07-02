import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import '../../config/getEnv';

interface TokenPayload {
    id : string,
    iat : number,
    exp : number
}


export default function authMiddleware(
    request : Request, 
    response : Response, 
    next : NextFunction
) {
    const { authorization } = request.headers;

    if(!authorization){
        return response.status(401).send();
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, String(process.env.APP_SECRET_KEY) );
        const { id } = data as TokenPayload;

        request.userId = id;

        return next();
    } catch {
        return response.status(401).send();
    }
}