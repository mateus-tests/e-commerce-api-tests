"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const Utils_1 = __importDefault(require("../utils/Utils"));
const utils = new Utils_1.default();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("../../config/getEnv");
class AuthServices {
    async authenticate({ request, response }) {
        const { email, password } = request.body;
        const user = await connection_1.default('users')
            .where('email', email)
            .first();
        if (!user) {
            return response.status(401).send();
        }
        const isValid = await utils.isValidPassword(password, user.password);
        if (!isValid) {
            return response.status(401).send();
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, String(process.env.APP_SECRET_KEY), { expiresIn: '30d' });
        delete user.password;
        return response.json({
            user,
            token
        });
    }
    socialAuthenticate({ request, response }) {
        const user = request.user;
        const token = jsonwebtoken_1.default.sign({ id: user.id }, String(process.env.APP_SECRET_KEY), { expiresIn: '30d' });
        delete user.password;
        return response.json({
            user,
            token
        });
    }
}
exports.default = AuthServices;
