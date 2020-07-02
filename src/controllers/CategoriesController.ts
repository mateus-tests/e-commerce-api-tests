import { Request, Response } from 'express';

import CategoriesServices from '../services/CategoriesServices';

const categoriesServices = new CategoriesServices();

export default class CategoriesController{
    index (request : Request, response : Response){
        categoriesServices.index({request, response});
    }
    update (request : Request, response : Response){
        categoriesServices.update({request, response});
    }
    show (request : Request, response : Response){
        categoriesServices.show({request, response});
    }
}