"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const Utils_1 = __importDefault(require("../utils/Utils"));
const utils = new Utils_1.default();
class PointsServices {
    async create({ request, response }) {
        const { name, email, whatsapp, latitude, longitude, city, uf, items, } = request.body;
        const trx = await connection_1.default.transaction();
        let newPoint = {
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=50',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city: utils.textFormatDefault(city),
            uf: utils.textFormatDefault(uf),
        };
        const insertedIds = await trx('points').insert(newPoint);
        const point_id = insertedIds[0];
        const pointItems = items.map((item_id) => {
            return {
                item_id,
                point_id,
            };
        });
        await trx('point_items').insert(pointItems);
        await trx.commit();
        return response.json({
            id: point_id,
            ...newPoint,
        });
    }
    async index({ request, response }) {
        const { uf, city, items } = request.query;
        if (!uf && !city && !items) {
            const retrieveData = await connection_1.default('points').select('*');
            console.log(retrieveData);
            return response.json(retrieveData);
        }
        const ufClean = utils.textFormatDefault(String(uf));
        const arrayItems = utils.stringToNumberArray(String(items));
        const cityClean = utils.textFormatDefault(String(city));
        const retrieveData = await connection_1.default('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', arrayItems)
            .where('city', cityClean)
            .where('uf', ufClean)
            .distinct()
            .select('points.*');
        return response.json(retrieveData);
    }
    async show({ request, response }) {
        const { id } = request.params;
        const retrieveData = await connection_1.default('points').where('id', id).first();
        if (!retrieveData) {
            return response.status(404).json({ message: 'point not found' });
        }
        const items = await connection_1.default('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');
        return response.json({ retrieveData, items });
    }
}
exports.default = PointsServices;
