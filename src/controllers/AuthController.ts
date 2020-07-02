import { Request, Response } from 'express';

import AuthServices from '../services/AuthServices';

const authServices = new AuthServices();

export default class AuthController{
    authenticate (request : Request, response : Response){
        authServices.authenticate({request, response});
    }
    socialAuthenticate (request : Request, response : Response){
        authServices.socialAuthenticate({request, response});
    }
}