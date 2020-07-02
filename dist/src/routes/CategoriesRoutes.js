"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoriesController_1 = __importDefault(require("../controllers/CategoriesController"));
const routes = express_1.Router();
const categoriesController = new CategoriesController_1.default();
routes.get('', categoriesController.index); //
routes.put('/:id', categoriesController.update);
routes.get('/:id', categoriesController.show);
exports.default = routes;
