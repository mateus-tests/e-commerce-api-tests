"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthServices_1 = __importDefault(require("../services/AuthServices"));
const authServices = new AuthServices_1.default();
class AuthController {
    authenticate(request, response) {
        authServices.authenticate({ request, response });
    }
    socialAuthenticate(request, response) {
        authServices.socialAuthenticate({ request, response });
    }
}
exports.default = AuthController;
