"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Utils {
    textFormatDefault(text) {
        return text.trim().toUpperCase();
    }
    stringToNumberArray(text) {
        return text.split(',').map(position => {
            return Number(position.trim());
        });
    }
    receiveProductPagination(products, page_number) {
        let index = 0;
        return products.filter(product => {
            index++;
            if (index > (Number(page_number) * 2) && index <= ((Number(page_number) + 1) * 2)) {
                return product;
            }
        });
    }
    getFinalPrice(products) {
        return products.reduce((accumulator, product) => {
            return product.price + accumulator;
        }, 0);
    }
    getFullUrl(request) {
        const url = request.protocol + '://' + request.get('host');
        return url;
    }
    decryptToken(authorization) {
        //decypting...
        return authorization;
    }
    passwordEncrypt(password) {
        return bcryptjs_1.default.hashSync(password, 8);
    }
    isValidPassword(password, encryptedPassword) {
        return bcryptjs_1.default.compare(password, encryptedPassword);
    }
}
exports.default = Utils;
