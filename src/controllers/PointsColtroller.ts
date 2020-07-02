import { Request, Response } from 'express';

import PointsServices from '../services/PointsServices';

const pointsServices  = new PointsServices();

export default class PointsController{
    create (request : Request, response : Response){
        pointsServices.create({ request, response });
    }
    index (request : Request, response : Response){
        pointsServices.index({request, response});
    }
    show (request : Request, response : Response){
        pointsServices.show({request, response});
    }
}


