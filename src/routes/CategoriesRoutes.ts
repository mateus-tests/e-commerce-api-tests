import { Router } from 'express';

import CategoriesController from '../controllers/CategoriesController';

const routes = Router();

const categoriesController = new CategoriesController();

routes.get('', categoriesController.index);
routes.delete('', categoriesController.destroy);
routes.put('/:id', categoriesController.update);
routes.get('/:id', categoriesController.show);
routes.get('/product/:product_id', categoriesController.retrieveCategorie);

export default routes;