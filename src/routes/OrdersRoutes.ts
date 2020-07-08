import { Router } from 'express';

import OrdersController from '../controllers/OrdersController';

const ordersController = new OrdersController();

import authMiddleware from '../middlewares/authMiddleware'

const routes = Router();

routes.get('', authMiddleware, ordersController.index);
routes.post('', authMiddleware,  ordersController.create);
routes.delete('/:order_id', authMiddleware, ordersController.destroy);
routes.put('/:order_id', authMiddleware,  ordersController.update);
routes.get('/payments', authMiddleware,  ordersController.payment);

routes.get('/payments/success', (request, response) => {
    response.json({status : 'success'});
});
routes.get('/payments/failure', (request, response) => {
    response.json({status : 'failure'});
});
routes.get('/payments/pending', (request, response) => {
    response.json({status : 'pending'});
});

export default routes;


