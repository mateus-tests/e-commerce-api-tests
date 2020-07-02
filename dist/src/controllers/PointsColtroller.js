"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PointsServices_1 = __importDefault(require("../services/PointsServices"));
const pointsServices = new PointsServices_1.default();
class PointsController {
    create(request, response) {
        pointsServices.create({ request, response });
    }
    index(request, response) {
        pointsServices.index({ request, response });
    }
    show(request, response) {
        pointsServices.show({ request, response });
    }
}
exports.default = PointsController;
