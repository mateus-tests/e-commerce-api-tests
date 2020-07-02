import { Request, Response } from 'express';

import OrdersServices from '../services/OrdersServices';

const ordersServices = new OrdersServices();

export default class OrdersController {
    index (request : Request, response : Response) {
        ordersServices.index({request, response});
    }
    create(request : Request, response : Response) {
        ordersServices.create({request, response});
    }
    destroy(request : Request, response : Response) {
        ordersServices.destroy({request, response});
    }
    update(request : Request, response : Response) {
        ordersServices.update({request, response});
    }
    payment(request : Request, response : Response) {
        ordersServices.payment({request, response});
    }
}