import { Router } from 'express';
import { carRouter } from '../routes/car'
import { driverRouter } from '../routes/driver'
import { carUseRouter } from '../routes/carUse'

const routes = Router();
 routes.use('/car', carRouter);
 routes.use('/drive', driverRouter);
 routes.use('/carUse', carUseRouter);

export { routes };