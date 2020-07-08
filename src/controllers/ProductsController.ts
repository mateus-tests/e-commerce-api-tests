import { Request, Response } from 'express';

import ProductsServices from '../services/ProductsServices';

const productsServices = new ProductsServices();

export default class ProductsController {
    index (request : Request, response : Response){
        productsServices.index({request, response});
    }
    show (request : Request, response : Response) {
        productsServices.show({request, response});
    }
    destroy (request : Request, response : Response) {
        productsServices.destroy({request, response});
    }
    destroyAll (request : Request, response : Response) {
        productsServices.destroyAll({request, response});
    }
    update (request : Request, response : Response) {
        productsServices.update({request, response});
    }
}