import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';

const productsController = new ProductsController();

const routes = Router();

routes.get('/:page_number', productsController.index);
routes.get('/:product_id', productsController.show);
routes.delete('/:product_id', productsController.destroy);
routes.delete('', productsController.destroyAll);
routes.put('/:product_id', productsController.update);

export default routes;