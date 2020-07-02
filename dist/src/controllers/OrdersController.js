"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrdersServices_1 = __importDefault(require("../services/OrdersServices"));
const ordersServices = new OrdersServices_1.default();
class OrdersController {
    index(request, response) {
        ordersServices.index({ request, response });
    }
    create(request, response) {
        ordersServices.create({ request, response });
    }
    destroy(request, response) {
        ordersServices.destroy({ request, response });
    }
    update(request, response) {
        ordersServices.update({ request, response });
    }
    payment(request, response) {
        ordersServices.payment({ request, response });
    }
}
exports.default = OrdersController;
