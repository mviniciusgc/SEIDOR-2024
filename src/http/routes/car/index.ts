import { Router } from 'express';
import { CarController } from '../../controller/car'

const carRouter = Router();
const carController = new CarController()

carRouter.post('/', carController.create)
carRouter.get('/find', carController.find)
carRouter.get('/findOne/:id', carController.findOne)
carRouter.delete('/delete/:id', carController.delete)
carRouter.put('/update/:id', carController.update)

export { carRouter };