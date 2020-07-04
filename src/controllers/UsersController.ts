import { Request, Response } from 'express';

import UsersServices from '../services/UsersServices';

const usersServices = new UsersServices();

export default class UsersController{
    index (request : Request, response : Response) {
        usersServices.index({ request, response });
    }
    show (request : Request, response : Response){
        usersServices.show({ request, response });
    }
    profile(request : Request, response : Response) {
        usersServices.profile({request, response});
    }
    store (request : Request, response : Response){
        usersServices.store({request, response});
    }
    destroy (request : Request, response : Response){
        usersServices.destroy({request, response});
    }
}