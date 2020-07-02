"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PointsColtroller_1 = __importDefault(require("../controllers/PointsColtroller"));
const routes = express_1.Router();
const pointsColtroller = new PointsColtroller_1.default();
routes.post('', pointsColtroller.create);
routes.get('', pointsColtroller.index);
routes.get('/:id', pointsColtroller.show);
exports.default = routes;
