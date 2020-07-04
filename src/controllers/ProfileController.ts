import { Request, Response } from 'express';

import UserServices from '../services/ProfileServices';

const usersServices = new UserServices();

export default class ProfileController {
    profile(request : Request, response : Response) {
        usersServices.profile({request, response});
    }
}