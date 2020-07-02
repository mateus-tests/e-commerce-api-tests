import { Router } from 'express';

import OrdersController from '../controllers/OrdersController';

const ordersController = new OrdersController();

const routes = Router();

routes.get('', ordersController.index);
routes.post('', ordersController.create);
routes.delete('/:order_id', ordersController.destroy);
routes.put('/:order_id', ordersController.update);
routes.get('/payments', ordersController.payment);

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


