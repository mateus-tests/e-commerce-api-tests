"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const Utils_1 = __importDefault(require("../utils/Utils"));
const utils = new Utils_1.default();
class UsersServices {
    constructor() {
        /*Users listll*/
        this.users = [
            'Mateus',
            'Henrique',
            'Supimpa',
            'Legal',
            'Tunel',
            'carrosel',
            'textel'
        ];
    }
    async index({ request, response }) {
        const retrieveUsers = await connection_1.default('users')
            .select('*');
        return response.json(retrieveUsers);
        /*const { search } = request.query;
        response.json( search === undefined ?
            this.users :
            this.users.filter(user => {
                return user.toUpperCase().includes(search.toString().toUpperCase());
        }));*/
    }
    show({ request, response }) {
        const { id } = request.params;
        return this.users[Number(id)] ?
            response.json({ user: this.users[Number(id)] }) :
            response.status(404).send('Not Found');
    }
    async store({ request, response }) {
        const { email, password, userName } = request.body;
        const profile_picture = 'http://localhost:3333/uploads/avatarDefault.svg';
        const userExists = await connection_1.default('users')
            .where('email', email)
            .first();
        if (!userExists) {
            const user = {
                email,
                password: utils.passwordEncrypt(password),
                userName,
                profile_picture
            };
            let insertedIds = await connection_1.default('users').insert(user);
            console.log(insertedIds);
            return response.json(user);
        }
        return response.status(409).send();
    }
    async destroy({ request, response }) {
        const { user_id } = request.params;
        const user = await connection_1.default('users').where('id', user_id).first();
        if (!user) {
            return response.status(404).send();
        }
        await connection_1.default('users')
            .where('id', user_id)
            .del();
        return response.json(user);
    }
}
exports.default = UsersServices;
