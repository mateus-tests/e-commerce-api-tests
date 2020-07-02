"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = __importDefault(require("../controllers/ProductsController"));
const productsController = new ProductsController_1.default();
const routes = express_1.Router();
routes.get('/:page_number', productsController.index);
routes.get('/:product_id', productsController.show);
routes.delete('/:product_id', productsController.destroy);
routes.put('/:product_id', productsController.update);
exports.default = routes;
