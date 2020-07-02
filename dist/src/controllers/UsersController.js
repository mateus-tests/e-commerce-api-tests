"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersServices_1 = __importDefault(require("../services/UsersServices"));
const usersServices = new UsersServices_1.default();
class UsersController {
    index(request, response) {
        usersServices.index({ request, response });
    }
    show(request, response) {
        usersServices.show({ request, response });
    }
    store(request, response) {
        usersServices.store({ request, response });
    }
    destroy(request, response) {
        usersServices.destroy({ request, response });
    }
}
exports.default = UsersController;
