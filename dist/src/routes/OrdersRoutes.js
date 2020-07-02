"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrdersController_1 = __importDefault(require("../controllers/OrdersController"));
const ordersController = new OrdersController_1.default();
const routes = express_1.Router();
routes.get('', ordersController.index);
routes.post('', ordersController.create);
routes.delete('/:order_id', ordersController.destroy);
routes.put('/:order_id', ordersController.update);
routes.get('/payments', ordersController.payment);
routes.get('/payments/success', (request, response) => {
    response.json({ status: 'success' });
});
routes.get('/payments/failure', (request, response) => {
    response.json({ status: 'failure' });
});
routes.get('/payments/pending', (request, response) => {
    response.json({ status: 'pending' });
});
exports.default = routes;
