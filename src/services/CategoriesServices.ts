import { Request, Response } from 'express';

import knex from '../database/connection';

import Utils from '../utils/Utils';
const utils = new Utils();

export default class CategoriesServices{
    async index({request, response} : { request : Request, response : Response }) {
        const retrieveCategories = await knex('categories').select('*');
        response.json(retrieveCategories);
    }
    async destroy({request, response} : { request : Request, response : Response }){
        const { id } = request.query;
        if(!id){
            return response.status(404).send();
        }
        try {
            await knex('categories').where('id', '>', Number(id)).del();
            await knex('categories_products').where('id', '>', Number(id)).del();
            return response.status(200).send();
        } catch {
            return response.status(404).send();
        }
    }
    
    async update({request, response} : {request : Request, response : Response}){
        const { id } = request.params;
        const { title, category_image_url, image_offers_url } = request.body;
        const retrieveCategorie = 
            await knex('categories')
                .select('*')
                .where('id', id)
                .first();
        response.json(retrieveCategorie);
    }
    async show({request, response} : {request : Request, response : Response}){
        const { id } = request.params;
        if(Number(id) === 0){
            return response.json({
                id : 0,
                title : "main",
                category_image_url : "main_category.png",
                image_offers_url : JSON.stringify({
                    imagem_1 : "banner1.png",
                    imagem_2 : "banner2.png",
                    imagem_3 : "banner3.png"
                })
            });
        }
        const retrieveCategorie = 
            await knex('categories')
                .select('*')
                .where('id', id)
                .first();
        response.json(retrieveCategorie);
    }
    async retrieveCategories({request, response} : {request : Request, response : Response}){
        const { products } = request.query;
        try{
            
            const products_ids = utils.stringToNumberArray(String(products));

        
            const categorieRetrieved = await knex('categories')
                        .join('categories_products', 'categories.id', '=', 'categories_products.categorie_id')
                        .whereIn('categories_products.product_id', products_ids)
                        .distinct();
                        
            return response.json(categorieRetrieved);
        } catch {
            return response.status(404).send();
        }
    }
}