"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("../../config/getEnv");
function authMiddleware(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).send();
    }
    const token = authorization.replace('Bearer', '').trim();
    try {
        const data = jsonwebtoken_1.default.verify(token, String(process.env.APP_SECRET_KEY));
        const { id } = data;
        request.userId = id;
        return next();
    }
    catch {
        return response.status(401).send();
    }
}
exports.default = authMiddleware;
