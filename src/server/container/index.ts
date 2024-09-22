import { container } from 'tsyringe';

import { ICarRepository } from '../../http/Repository/interface/ICarRepository';
import { CarRepository } from '../../http/Repository/car';

import { IDriveRepository } from '../../http/Repository/interface/IDriveRepository';
import { DriveRepository } from '../../http/Repository/drive';

import { ICarUseRepository } from '../../http/Repository/interface/ICarUseRepository';
import { CarUseRepository } from '../../http/Repository/carUse';

container.registerSingleton<ICarRepository>('CarRepository', CarRepository);
container.registerSingleton<IDriveRepository>('DriveRepository', DriveRepository);
container.registerSingleton<ICarUseRepository>('CarUseRepository', CarUseRepository);
