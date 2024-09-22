import { injectable, inject } from "tsyringe";
import { ICarUseRepository } from '../../Repository/interface/ICarUseRepository'
import CarUse from '../../../db/entity/carUse'
import Drive from '../../../db/entity/drive'
import Car from '../../../db/entity/car'

@injectable()
class FindOneCarServer {

    constructor(
        @inject('CarUseRepository')
        private carUseRepository: ICarUseRepository,
    ) { }

    public async execute(drive?: Drive, car?: Car): Promise<CarUse | null> {

        return await this.carUseRepository.findOne(drive, car);
    }
    
}
export { FindOneCarServer }