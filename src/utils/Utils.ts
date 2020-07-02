import { Request } from 'express';

import bcrypt from 'bcryptjs';

type Product = {
    id : number;
    title : string;
    main_image_url : string;
    images_url : string;
    assessments : number;
    price : number;
    technical_informations : string; 
    plots : string; 
    payment_methods :  string; 
}

export default class Utils{
    textFormatDefault(text : string){
        return text.trim().toUpperCase();
    }
    stringToNumberArray(text : string){
        return text.split(',').map( position => {
            return Number(position.trim());
        });
    }
    receiveProductPagination(products : Product[], page_number : number){
        let index = 0;
        return products.filter( product => {
            index++;
            if( index > (Number(page_number) * 2) && index <= ( (Number(page_number) + 1) * 2) ){
                return product;
            }
        } );
    }
    getFinalPrice (products : Product[]) : number{
        return products.reduce( (accumulator : number, product : Product) => {
            return product.price + accumulator;
        }, 0);
    }
    getFullUrl (request : Request) : string{
        const url = request.protocol + '://' + request.get('host');
        return url;
    }
    decryptToken (authorization : string) {
        //decypting...
        return authorization;
    }

    passwordEncrypt (password : string) : string {
        return bcrypt.hashSync(password, 8);
    }
    isValidPassword (password : string, encryptedPassword : string) : Promise<boolean> {
        return bcrypt.compare(password, encryptedPassword);
    }

} 