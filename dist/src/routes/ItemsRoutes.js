"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ItemsController_1 = __importDefault(require("../controllers/ItemsController"));
const routes = express_1.Router();
const itemsController = new ItemsController_1.default();
routes.get('', itemsController.index);
exports.default = routes;
