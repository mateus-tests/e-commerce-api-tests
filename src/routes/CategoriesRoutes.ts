import { Router } from 'express';

import CategoriesController from '../controllers/CategoriesController';

const routes = Router();

const categoriesController = new CategoriesController();

routes.get('', categoriesController.index);//
routes.put('/:id', categoriesController.update);
routes.get('/:id', categoriesController.show);

export default routes;