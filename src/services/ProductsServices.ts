import { Request, Response } from 'express';

import knex from '../database/connection';

import Utils from '../utils/Utils';

const utils = new Utils();

export default class ProductServices{
    async index ({request, response} : {request : Request, response : Response}){
        const { categories } = request.query;
        const { page_number } = request.params;
        if(!categories){
            const retrieveProducts = await knex('products').select('*');
            const retrieveProductsPage = utils.receiveProductPagination(retrieveProducts, Number(page_number));//

            return response.json({
                products : retrieveProductsPage, 
                quantity : retrieveProducts.length
            });
        }
        const categories_ids = utils.stringToNumberArray(String(categories));
        const retrieveProducts = 
        await   knex('products')
            .join('categories_products', 'products.id', '=', 'categories_products.product_id')
            .whereIn('categories_products.categorie_id', categories_ids)
            .distinct()
            .select('products.*');
        
        const retrieveProductsPage = utils.receiveProductPagination(retrieveProducts, Number(page_number));

        return response.json({
            products : retrieveProductsPage, 
            quantity : retrieveProducts.length
        });
    }
    async show ({request, response} : { request : Request, response : Response }) {
        const { product_id } = request.params;
        const retrieveProducts = 
        await   knex('products')
            .where('id', product_id)
            .first();
        if(!retrieveProducts){
            return response.status(404).send();
        }
        return response.json(retrieveProducts);
    }
    async destroy ({request, response} : { request : Request, response : Response }){
        const { product_id } = request.params;
        const retrieveId = await   knex('products')
            .where('id', product_id)
            .del();
        if(retrieveId === 0){
            return response.status(404).send();
        }
        return response.status(200).send();
    }
    async update ({request, response} : {request : Request, response : Response}){
        const { product_id } = request.params;
        const { 
            title,
            main_image_url,
            images_url,
            assessments,
            price,
            technical_informations,
            plots,
            payment_methods
        } = request.body;

        const newData = {
            title,
            main_image_url,
            images_url,
            assessments,
            price,
            technical_informations,
            plots,
            payment_methods
        }
        const retrieveId = await   knex('products')
            .where('id', product_id)
            .update(newData);
        if(retrieveId === 0) {
            return response.status(404).send();
        }
        return response.json(newData);
    }
}