import { Router } from 'express';
import PointsController from '../controllers/PointsColtroller';

const routes = Router();
const pointsColtroller = new PointsController();

routes.post('', pointsColtroller.create);
routes.get('', pointsColtroller.index);
routes.get('/:id', pointsColtroller.show);

export default routes;