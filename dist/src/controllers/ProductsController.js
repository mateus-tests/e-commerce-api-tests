"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductsServices_1 = __importDefault(require("../services/ProductsServices"));
const productsServices = new ProductsServices_1.default();
class ProductsController {
    index(request, response) {
        productsServices.index({ request, response });
    }
    show(request, response) {
        productsServices.show({ request, response });
    }
    destroy(request, response) {
        productsServices.destroy({ request, response });
    }
    update(request, response) {
        productsServices.update({ request, response });
    }
}
exports.default = ProductsController;
