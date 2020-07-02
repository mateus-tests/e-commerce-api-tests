"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = __importDefault(require("../controllers/UsersController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const routes = express_1.Router();
const usersController = new UsersController_1.default();
routes.get('', authMiddleware_1.default, usersController.index);
routes.get('/:id', usersController.show);
routes.post('', usersController.store);
routes.delete('/:user_id', usersController.destroy);
exports.default = routes;
