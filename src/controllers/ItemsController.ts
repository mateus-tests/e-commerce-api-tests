import { Request, Response } from 'express';

import ItemsServices from '../services/ItemsServices';

const itemsServices = new ItemsServices();

export default class ItemsController{
    index (request : Request, response : Response){
        itemsServices.index({request, response});
    }
}