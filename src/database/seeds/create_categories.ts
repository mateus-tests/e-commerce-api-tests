import Knex from 'knex';

export async function seed(knex : Knex){
    const images = {
        image_1 : 'banner1.png',
        image_2 : 'banner2.png',
        image_3 : 'banner3.png'
    }
    
    await knex('categories').select('*').del();
    await knex('categories').insert([
        { 
            title : 'Lâmpadas',
            category_image_url : 'lampadas.svg', 
            image_offers_url : JSON.stringify(images) 
        },
        { 
            title : 'Pilhas e baterias',
            category_image_url : 'baterias.svg', 
            image_offers_url : JSON.stringify(images) 
        },
        
        { 
            title : 'Papeis e papelão', 
            category_image_url : 'papeis-papelao.svg',
            image_offers_url : JSON.stringify(images)
        },
        { 
            title : 'Resíduos eletrônicos', 
            category_image_url : 'eletronicos.svg',
            image_offers_url : JSON.stringify(images)
        },
        { 
            title : 'Resíduos orgânicos', 
            category_image_url : 'organicos.svg',
            image_offers_url : JSON.stringify(images)
        },
        { 
            title : 'Óleo de cozinha', 
            category_image_url : 'oleo.svg',
            image_offers_url : JSON.stringify(images)
        },
    ]);
}