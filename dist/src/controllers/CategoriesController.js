"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriesServices_1 = __importDefault(require("../services/CategoriesServices"));
const categoriesServices = new CategoriesServices_1.default();
class CategoriesController {
    index(request, response) {
        categoriesServices.index({ request, response });
    }
    update(request, response) {
        categoriesServices.update({ request, response });
    }
    show(request, response) {
        categoriesServices.show({ request, response });
    }
}
exports.default = CategoriesController;
