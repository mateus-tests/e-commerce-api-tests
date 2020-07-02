"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const authController = new AuthController_1.default();
const routes = express_1.Router();
routes.post('', authController.authenticate);
routes.get("/google/redirect", passport_1.default.authenticate('google'), authController.socialAuthenticate);
routes.get('/google', passport_1.default.authenticate('google', {
    scope: ['profile']
}));
routes.get("/facebook/redirect", passport_1.default.authenticate('facebook'), authController.socialAuthenticate);
routes.get('/facebook', passport_1.default.authenticate('facebook', {
    scope: ['email']
}));
exports.default = routes;
