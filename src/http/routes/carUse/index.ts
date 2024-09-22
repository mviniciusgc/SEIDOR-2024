import { Router } from 'express';
import { CarUserController } from '../../controller/carUse'

const carUseRouter = Router();
const carUseController = new CarUserController()

carUseRouter.post('/', carUseController.create)
carUseRouter.get('/find', carUseController.find)
carUseRouter.patch('/update/:id', carUseController.patch)

export { carUseRouter };