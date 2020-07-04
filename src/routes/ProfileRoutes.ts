import { Router } from 'express';

const routes = Router();

import authMiddleware from '../middlewares/authMiddleware';

import ProfileController from '../controllers/ProfileController';

const profileController = new ProfileController();

routes.get('', authMiddleware, profileController.profile);

export default routes;