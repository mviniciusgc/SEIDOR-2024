import { injectable, inject } from "tsyringe";
import { ICarUseRepository } from '../../Repository/interface/ICarUseRepository'
import CarUse from '../../../db/entity/carUse'

@injectable()
class FindCarUseServer {

    constructor(
        @inject('CarUseRepository')
        private carUseRepository: ICarUseRepository,
    ) { }

    public async execute(): Promise<CarUse[]> {

        return await this.carUseRepository.find();
    }
    
}
export { FindCarUseServer }