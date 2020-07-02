"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemsServices_1 = __importDefault(require("../services/ItemsServices"));
const itemsServices = new ItemsServices_1.default();
class ItemsController {
    index(request, response) {
        itemsServices.index({ request, response });
    }
}
exports.default = ItemsController;
