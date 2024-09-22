import { injectable, inject } from "tsyringe";
import { ICarRepository } from '../../Repository/interface/ICarRepository'
import Car from '../../../db/entity/car'

@injectable()
class FindOneCarServer {

    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository
    ) { }

    public async execute(id: number): Promise<Car | null> {

        return await this.carRepository.findOne(id);
    }
    
}
export { FindOneCarServer }