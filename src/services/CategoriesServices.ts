import { Request, Response } from 'express';

import knex from '../database/connection';

import utils from '../utils/Utils';

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
}