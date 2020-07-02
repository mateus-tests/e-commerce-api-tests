"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class CategoriesServices {
    async index({ request, response }) {
        const retrieveCategories = await connection_1.default('categories').select('*');
        response.json(retrieveCategories);
    }
    async update({ request, response }) {
        const { id } = request.params;
        const { title, category_image_url, image_offers_url } = request.body;
        const retrieveCategorie = await connection_1.default('categories')
            .select('*')
            .where('id', id)
            .first();
        response.json(retrieveCategorie);
    }
    async show({ request, response }) {
        const { id } = request.params;
        if (Number(id) === 0) {
            return response.json({
                id: 0,
                title: "main",
                category_image_url: "main_category.png",
                image_offers_url: JSON.stringify({
                    imagem_1: "banner1.png",
                    imagem_2: "banner2.png",
                    imagem_3: "banner3.png"
                })
            });
        }
        const retrieveCategorie = await connection_1.default('categories')
            .select('*')
            .where('id', id)
            .first();
        response.json(retrieveCategorie);
    }
}
exports.default = CategoriesServices;
