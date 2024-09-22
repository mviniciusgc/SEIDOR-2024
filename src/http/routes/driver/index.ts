import { Router } from 'express';
import { DriveController } from '../../controller/driver'

const driverRouter = Router();
const driveController = new DriveController()

driverRouter.post('/', driveController.create)
driverRouter.get('/find', driveController.find)
driverRouter.get('/findOne/:id', driveController.findOne)
driverRouter.delete('/delete/:id', driveController.delete)
driverRouter.put('/update/:id', driveController.update)

export { driverRouter };