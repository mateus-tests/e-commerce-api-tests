import Knex from 'knex';

export async function seed(knex : Knex){
    const images = {
        image_1 : 'banner1.png',
        image_2 : 'banner2.png',
        image_3 : 'banner3.png'
    }
    const trx = await knex.transaction();

    await trx('products').insert([
        { 
            title : 'Lâmpada Led',
            main_image_url : 'lampadas.svg', 
            images_url : JSON.stringify(images),
            assessments : 4,
            price : 255.55,
            technical_informations : 'none',
            plots : '12x',
            payment_methods : 'à vista, cartão'
        },
        { 
            title : 'Folha A4',
            main_image_url : 'baterias.svg', 
            images_url : JSON.stringify(images),
            assessments : 4,
            price : 355.55,
            technical_informations : 'none',
            plots : '7x',
            payment_methods : 'à vista, cartão'
        },
        
        { 
            title : 'Smartphone', 
            main_image_url : 'lampadas.svg', 
            images_url : JSON.stringify(images),
            assessments : 4,
            price : 455.99,
            technical_informations : 'none',
            plots : '15x',
            payment_methods : 'à vista, cartão'
        },
        { 
            title : 'Milho', 
            main_image_url : 'lampadas.svg', 
            images_url : JSON.stringify(images),
            assessments : 4,
            price : 395.00,
            technical_informations : 'none',
            plots : '10x',
            payment_methods : 'à vista, cartão'
        },
        { 
            title : 'Caneta Bic', 
            main_image_url : 'lampadas.svg', 
            images_url : JSON.stringify(images),
            assessments : 4,
            price : 405.19,
            technical_informations : 'none',
            plots : '2x',
            payment_methods : 'à vista, cartão'
        },
        { 
            title : 'Folha A5', 
            main_image_url : 'lampadas.svg', 
            images_url : JSON.stringify(images),
            assessments : 4,
            price : 255.55,
            technical_informations : 'none',
            plots : '12x',
            payment_methods : 'à vista, cartão'
        },
    ]);

    await trx('categories_products').insert([
        { 
            categorie_id : 1,
            product_id : 1
        },
        { 
            categorie_id : 3,
            product_id : 2
        },
        
        { 
            categorie_id : 4,
            product_id : 3
        },
        { 
            categorie_id : 5,
            product_id : 4
        },
        { 
            categorie_id : 1,
            product_id : 5
        },
        { 
            categorie_id : 1,
            product_id : 6
        },
    ]);

    await trx.commit();
}