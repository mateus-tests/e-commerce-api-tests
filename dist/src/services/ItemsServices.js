"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class ItemsServices {
    async index({ request, response }) {
        const items = await connection_1.default('items').select('*');
        const serializedItems = items.map(item => {
            const { id, image, title } = item;
            return {
                id,
                title,
                image_url: `http://localhost:3333/uploads/${image}`
            };
        });
        response.json(serializedItems); //
    }
}
exports.default = ItemsServices;
