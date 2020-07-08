import knex from '../database/connection';

import { Request, Response } from 'express';

import Utils from '../utils/Utils';

import '../../config/getEnv';

const MercadoPago = require('mercadopago');

const utils = new Utils();

export default class OrdersServices {
    async index ({request, response} : { request : Request, response : Response }) {
        const { userId } = request;
        
        const retrieveProducts = await knex('products')
            .join('orders','products.id', '=', 'orders.product_id')
            .where('orders.user_id', userId)
            .distinct()
            .select('products.*');
        const total = utils.getFinalPrice(retrieveProducts);
        return response.json({
            products : retrieveProducts,
            total
        });
    }
    async create ({request, response} : { request : Request, response : Response }){
        const { userId } = request;
        const { product_id } = request.body;
        const retrieveProduct = await knex('products')
                                    .where('id', product_id)
                                    .first();
        const status = "selected"
        if(!retrieveProduct){
            response.status(404).send();
        }
        const order = {
            product_id,
            user_id : userId,
            status
        }
        await knex('orders').insert(order);

        return response.json(order);
    }
    async destroy({request, response} : { request : Request, response : Response }){
        const { order_id } = request.params;
        const { userId } = request;
        const retrieveOrder = await knex('orders')
                                        .where('id', order_id)
                                        .first();
        
        if(!retrieveOrder || String(retrieveOrder.user_id) !== userId){
            return response.status(401).send();
        }
        await knex('orders')
                .where('id', order_id)
                .del();
        return response.status(200).send();
    }

    async update({request, response} : { request : Request, response : Response }){
        const { order_id } = request.params;
        const { userId } = request;
        const retrieveOrder = await knex('orders')
                                        .where('id', order_id)
                                        .first();
        
        if(!retrieveOrder || String(retrieveOrder.user_id) !== userId){
            return response.status(401).send();
        }
        await knex('orders')
                .where('id', order_id)
                .update('product_id', '2');
        return response.status(200).send();
    }
    async payment({request, response} : {request : Request, response : Response}){
        const { userId } = request;
        MercadoPago.configure({
            sandbox: process.env.SANDBOX == 'true' ? true : false,
            access_token: process.env.MP_ACCESS_TOKEN
        });
        const { email, id } = await knex('users')
                                .where('id', userId)
                                .first();
        
        const retrieveProducts = await knex('products')
            .join('orders','products.id', '=', 'orders.product_id')
            .where('orders.user_id', userId)
            .distinct()
            .select('products.*');
        
        const total = utils.getFinalPrice(retrieveProducts);

        const purchaseOrder = {
            items:
                retrieveProducts.map( product => (
                    {
                        id: product.id,
                        title: product.title,
                        description : product.title,
                        quantity: 1,
                        currency_id: 'BRL',
                        unit_price: parseFloat(product.price)
                    }
                ) ),
            
            payer : {
                email : "mateusapolinario610@gmail.com"
            },
            auto_return : "all",
            external_reference : String(id),
            back_urls : {
                success : utils.getFullUrl(request) + "/orders/payments/success",
                pending : utils.getFullUrl(request) + "/orders/payments/pending",
                failure : utils.getFullUrl(request) + "/orders/payments/failure",
            }
        }


        try {
            const preference = await MercadoPago.preferences.create(purchaseOrder);
            return response.redirect(`${preference.body.init_point}`);
        }catch(err){
            return response.send(err.message);
        }
        
    }
}