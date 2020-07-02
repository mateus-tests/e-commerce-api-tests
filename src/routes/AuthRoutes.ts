import { Router } from 'express';

import passport from 'passport';

import AuthController from '../controllers/AuthController';

const authController = new AuthController();

const routes = Router();

routes.post('', authController.authenticate);

routes.get("/google/redirect", passport.authenticate('google'),authController.socialAuthenticate);

routes.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

routes.get("/facebook/redirect", passport.authenticate('facebook'), authController.socialAuthenticate);

routes.get('/facebook', passport.authenticate('facebook', {
    scope: ['email']
}))

export default routes;